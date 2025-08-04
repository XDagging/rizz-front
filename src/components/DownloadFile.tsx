
type DownloadType = {
  charmNum: number;
  executionNum: number;
};

export default function DownloadFile(props: DownloadType) {
  const charm = props.charmNum || 400;
  const execution = props.executionNum || 400;
  const total = charm + execution;
  const percentile = Math.ceil((total / 100) * 6.2) || 20;

  return (
    <section
      style={{ backgroundColor: "#fbfcff" }}
      className="w-[1080px] h-[1920px] font-1 flex flex-col justify-between p-12 text-black"
    >
      {/* Header */}
    

      {/* Main Score Box */}
      <div
        style={{ backgroundColor: "#fff" }}
        className="w-full rounded-2xl p-10 border border-gray-200 flex flex-col items-center justify-center space-y-10 shadow-lg flex-grow"
      >
          <div className="flex flex-col mb-auto items-center text-center space-y-4">
        <p className="font-1 font-bold text-3xl">
          The{" "}
          <span
            className="italic font-1 text-7xl leading-tight"
            style={{ color: "#de3f97" }}
          >
            Official Dating SAT
          </span>
        </p>
        <p className="font-1 text-3xl font-semibold">toomanyheys.com</p>
      </div>
        {/* Total Score */}
        <div className="flex flex-col items-center">
          <p className="font-1 font-semibold text-3xl text-gray-800">
            TOTAL SCORE
          </p>
          <p
            className="font-extrabold text-9xl leading-none tracking-tighter"
            style={{ color: "#de3f97" }}
          >
            {total || 800}
          </p>
          <p className="text-xl text-gray-500">400-1600</p>
        </div>

        {/* Subscores */}
        <div className="flex w-full justify-around text-center">
          <div className="flex flex-col items-center space-y-2">
            <p className="font-1 font-semibold text-4xl">💖 Charm</p>
            <p className="font-bold text-6xl">{charm}</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <p className="font-1 font-semibold text-4xl">🎭 Execution</p>
            <p className="font-bold text-6xl">{execution}</p>
          </div>
        </div>

        {/* Benchmarks & Percentile Section */}
        <div className="flex flex-col w-full text-center space-y-6">
          {/* Benchmark */}
          <div className="text-2xl leading-snug">
            {total > 1300 ? (
              <>
                🔥 You{" "}
                <span className="font-extrabold text-[#de3f97]">exceed</span>{" "}
                the college readiness benchmark.
              </>
            ) : (
              <>
                😬 You{" "}
                <span className="font-extrabold text-red-500">
                  do not meet
                </span>{" "}
                our college readiness benchmark.
              </>
            )}
          </div>

          {/* Percentile */}
          <div className="flex flex-col items-center">
            <p className="font-1 font-bold text-4xl text-gray-800">
              📊 Your state
            </p>
            <p className="font-extrabold text-7xl leading-snug tracking-tight">
              {percentile}th Percentile
            </p>
            <p className="text-2xl text-gray-600">
              {percentile}% of people scored the same as or below you.
            </p>
          </div>
        </div>
            <div className="flex flex-col mt-auto items-center text-center space-y-2">
        <p className="font-1 text-2xl font-semibold">
          I took this on{" "}
          <span className="font-extrabold">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>
        <p className="font-1 text-4xl font-bold">
          Take your test at <br />
          <span style={{ color: "#de3f97" }}>toomanyheys.com</span>
        </p>
      </div>
      </div>

      {/* Footer */}
  
    </section>
  );
}
