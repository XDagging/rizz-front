import React, { useEffect, useRef } from "react";
import { resolveTailwindBgHex } from "../functions";

type ScoreBoxType = {
  charmNum: number;
  executionNum: number;
  dateTaken: number;
};

export default function ScoreBox(props: ScoreBoxType) {


  return (
    <div data-export="true" className="w-full">
      <div className="flex flex-row gap-2 mt-4">
        <div className="border-b bg-base-100 border-base-300 w-full h-full">
          <div className="w-full min-h-80 p-2">
            <div className="font-1 rounded-box bg-base-100 p-3">
              <div className="w-full pb-4 flex flex-row items-center gap-4 border-b">
                <div className="flex flex-row items-end gap-2">
                  <div>
                    <p className="font-semibold">TOTAL SCORE</p>
                    <p className="text-5xl font-bold">
                      {Math.floor(Number(props.charmNum + props.executionNum))}
                    </p>
                  </div>
                  <p className="text-sm">400-1600</p>
                </div>
                <div className="sm:ml-auto flex sm:flex-row gap-8 sm:w-4/6">
                  <div>
                    <p className="font-semibold font-1">Charm</p>
                    <p className="font-bold text-2xl">{props.charmNum}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Execution</p>
                    <p className="font-bold text-2xl">{props.executionNum}</p>
                  </div>
                </div>
              </div>

              {props.executionNum + props.charmNum > 1300 ? (
                <p className="mt-2 border-b pb-4">
                  You <span className="font-semibold">meet or exceed</span> our
                  college and career readiness benchmarks in Charm and
                  Execution!
                </p>
              ) : (
                <p className="mt-2 border-b pb-4">
                  You <span className="font-semibold">do not</span> meet our
                  college and career readiness benchmarks in Charm and
                  Execution. Lock in twin!
                </p>
              )}

              <div className="py-4 border-b">
                <p className="font-semibold">Your state</p>
                <p className="font-semibold text-2xl">
                  {Math.ceil(
                    (Number(props.charmNum + props.executionNum) / 100) * 6.2
                  )}
                  th Percentile
                </p>
                <p className="text-sm">
                  {Math.ceil(
                    (Number(props.charmNum + props.executionNum) / 100) * 6.2
                  )}
                  % of students scored the same as or below you
                </p>
              </div>
              <div className="mt-2">
                <p className="text-sm">
                  {new Date(props.dateTaken).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
