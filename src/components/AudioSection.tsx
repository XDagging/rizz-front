import { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/16/solid";
import { MicrophoneIcon } from "@heroicons/react/16/solid";
import callApi from "../functions";
import type { MessageType } from "../types";
import type { Dispatch, SetStateAction } from "react";

type AudioProps = {
  question: {
    question: string;
    goal: string;
  };
  testId: string;
  questionNumber: number;
  setLiveAnswers: Dispatch<SetStateAction<MessageType[]>>;
};

type ISpeechRecognition = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onaudioend?: () => void;
  onaudiostart?: () => void;
  onend?: () => void;
  onerror?: (event: any) => void;
  onnomatch?: () => void;
  onresult?: (event: any) => void;
  onsoundstart?: () => void;
  onsoundend?: () => void;
  onspeechend?: () => void;
  onspeechstart?: () => void;
  onstart?: () => void;
};

type ISpeechRecognitionConstructor = new () => ISpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognitionConstructor;
    webkitSpeechRecognition: ISpeechRecognitionConstructor;
  }
}

let sawWarning = false;

export default function AudioSection(props: AudioProps) {
  const modal = useRef<HTMLDialogElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const [messageSaid, setMessageSaid] = useState("");
  const [question, setQuestion] = useState(props.question);
  const [, setQuestionNumber] = useState(props.questionNumber);
  const [myTurn, setMyTurn] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [blocked, setBlocked] = useState(false);
  const [warning, setWarning] = useState(sawWarning);
  const [startConvo, setStartConvo] = useState(false);

  // Setup recognition on question load or startConvo
  useEffect(() => {
    if (!warning && modal.current) {
      modal.current.showModal();
      setWarning(true);
      return;
    }

    setQuestion(props.question);
    setQuestionNumber(props.questionNumber);

    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert("Your browser does not support speech recognition. Your score is now capped at a 1400. To not get this message, take this on a chrome or equivalent browser (not apple).")
      console.warn("SpeechRecognition API is not supported in this browser.");
      return;
    }

    if (blocked || !startConvo) {
      console.log("Waiting for startConvo...");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("🎤 Speech recognition started");
    };

    recognition.onresult = (event) => {
      if (myTurn) {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        console.log("Transcript:", transcript);
        setMessageSaid(transcript);
      }
    };

    recognition.onsoundend = () => {
      console.log("Speech ended");
      setMyTurn(false);
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      setBlocked(true);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [props.question, props.questionNumber, startConvo]);

  // Start recognition when ready
  useEffect(() => {
    if (
      startConvo &&
      recognitionRef.current &&
      myTurn &&
      !blocked
    ) {
      try {
        console.log("🔊 Attempting to start recognition...");
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    }
  }, [startConvo, recognitionRef.current, myTurn, blocked]);

  // After user speaks, process and reply
  useEffect(() => {
    async function process() {
      if (!myTurn && recognitionRef.current && !blocked && startConvo) {
        recognitionRef.current.stop();

        const newMessages = [
          ...messages,
          { side: "right", message: messageSaid ?? "" } as MessageType,
        ];

        const res = await callApi("/getTest/voiceResponse", "POST", {
          testId: props.testId,
          messages: newMessages,
        });

        if (res.code === "err") return;

        const aiResponse = res.message;
        if (aiResponse.toLowerCase().includes("*blocked")) {
          setBlocked(true);
          return;
        }

        newMessages.push({ side: "left", message: aiResponse });

        const synth = window.speechSynthesis;
        let allVoices = synth.getVoices();

        if (synth.onvoiceschanged !== undefined) {
          synth.onvoiceschanged = () => {
            allVoices = synth.getVoices();
          };
        }

        const getBestWhiteWomanVoice = (voices: any) => {
          const preferred = [
            "Google UK English Female",
            "Google US English",
            "Samantha",
            "Karen",
            "Moira",
          ];
          return (
            voices.find((v: any) =>
              preferred.some((name) => v.name.includes(name))
            ) ||
            voices.find((v: any) => v.name.toLowerCase().includes("female")) ||
            voices[0]
          );
        };

        const whiteWomanVoice = getBestWhiteWomanVoice(allVoices);

        function speakWithExpressivePitch(text: string) {
          const phrases = text
            .split(/(?<=[.,!?])\s+/)
            .map((p) => p.trim())
            .filter((p) => /[a-zA-Z]/.test(p));

          let index = 0;

          const speakNext = () => {
            if (index >= phrases.length) {
              setTimeout(() => {
                setMyTurn(true);
                setMessages(newMessages);
              }, 200);
              return;
            }

            const utter = new SpeechSynthesisUtterance(phrases[index]);
            utter.voice = whiteWomanVoice;
            utter.rate = 0.94;
            utter.pitch = 1.0 + Math.sin(index * 0.8) * 0.1;
            utter.volume = 1;

            utter.onend = () => {
              index++;
              speakNext();
            };

            synth.speak(utter);
          };

          speakNext();
        }

        speakWithExpressivePitch(aiResponse);
      }
    }

    process();
  }, [myTurn]);

  return (
    <>
      {/* Modal for directions */}
      <dialog ref={modal} id="my_modal_1" className="modal">
        <div className="modal-box font-1">
          <div className="text-xs">
            <kbd className="kbd">ESC</kbd> to exit
          </div>
          <h3 className="font-bold text-xl">Directions</h3>
          <div className="py-4 gap-2 flex flex-col justify-start">
            <p>
              You will have <span className="font-bold">the remaining time</span> to use your skills in this
              hypothetical situation
            </p>
            <p>Use your microphone to talk back and forth, make sure you sound clear.</p>
            <p>If you get blocked, the clock will run down and your test is over.</p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Continue</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="grid md:grid-cols-2 min-h-[125vh] md:min-h-0 grid-cols-1 w-full md:gap-0 gap-3 mx-auto items-start justify-items-start h-full p-10">
        <div className="mockup-phone md:w-fit w-full md:h-[60vh] h-[50vh]">
          <div className="mockup-phone-display w-full md:w-[390px] h-full bg-base-300 flex flex-col">
            <div className="w-full p-5 bg-base-100 flex items-center border-b border-neutral">
              <ChevronLeftIcon className="size-6" />
              <p className="font-1 text-left ml-2 font-semibold flex-1">Ashley</p>
              <div className="flex gap-4">
                <PhoneIcon className="size-6" />
                <VideoCameraIcon className="size-6 text-green-500" />
              </div>
            </div>

            <div className="w-full h-full flex flex-col items-center gap-2 justify-center">
              {startConvo ? (
                !blocked ? (
                  <>
                    <div
                      className={`p-5 rounded-full cursor-pointer ${
                        myTurn ? "text-primary-content bg-primary" : "text-red-500 bg-base-100"
                      }`}
                    >
                      <MicrophoneIcon className="size-12" />
                    </div>
                    <p
                      className={`font-bold text-2xl ${
                        myTurn ? "text-primary" : "text-red-500"
                      }`}
                    >
                      {myTurn ? "Talk Now" : "Hold on"}
                    </p>
                    <p className="p-3 font-1 font-semibold">{messageSaid}</p>
                  </>
                ) : (
                  <>
                    <div className="p-5 rounded-full text-red-500">
                      <MicrophoneIcon className="size-12" />
                    </div>
                    <p className="text-error font-1 font-bold">She hung up on you lil bro</p>
                  </>
                )
              ) : (
                <div className="font-1 mx-auto w-4/6 flex flex-col gap-2 items-center justify-center text-center">
                  <p className="text-lg font-semibold font-1 text-primary">Start Conversation</p>
                  <button className="btn btn-primary" onClick={() => setStartConvo(true)}>
                    Start Call
                  </button>
                  <p>
                    Remember you will need to talk quickly back and forth; taking too long will get
                    you blocked
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 font-1">
          {blocked && <div className="badge badge-error font-1">Blocked</div>}

          <div className="flex flex-row bg-base-300 items-center font-1 gap-4 w-full">
            <p className="p-2 bg-neutral text-neutral-content font-1 font-bold">
              {props.questionNumber + 1}
            </p>
            <p>DMS Situationals</p>
          </div>

          <p>{question.question}</p>
          <p className="font-bold">Use what you know to do the following: {question.goal}</p>
        </div>
      </div>
    </>
  );
}
