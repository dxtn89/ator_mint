const Countdown = () => {
  const updateCountdown = () => {
    // Set the target date to December 22 at midnight
    const targetDate = new Date("2024-12-21T00:00:00");

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in seconds
    const timeDiffInSeconds = Math.floor(
      (targetDate.getTime() - currentDate.getTime()) / 1000
    );

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDiffInSeconds / 86400);
    const hours = Math.floor((timeDiffInSeconds % 86400) / 3600);
    const minutes = Math.floor((timeDiffInSeconds % 3600) / 60);
    const seconds = timeDiffInSeconds % 60;

    // NOTE: Values must between 1 and 99

    // Update the HTML elements
    (document.getElementById("days") as HTMLElement)?.style.setProperty(
      "--value",
      days.toString()
    );

    (document.getElementById("hours") as HTMLElement)?.style.setProperty(
      "--value",
      hours.toString()
    );

    (document.getElementById("minutes") as HTMLElement)?.style.setProperty(
      "--value",
      minutes.toString()
    );

    (document.getElementById("seconds") as HTMLElement)?.style.setProperty(
      "--value",
      seconds.toString()
    );
  };

  // Update the countdown every second
  setInterval(updateCountdown, 1000);

  // Initial update
  updateCountdown();

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max my-6">
      <div className="flex flex-col p-2 bg-gray-900 rounded-box text-neutral-content shadow-xl shadow-cyan-300/20 ring ring-gray-600/30">
        <span className="countdown font-mono text-5xl">
          <span id="days"></span>
        </span>
        days
      </div>

      <div className="flex flex-col p-2 bg-gray-900 rounded-box text-neutral-content shadow-xl shadow-cyan-300/20 ring ring-gray-600/30">
        <span className="countdown font-mono text-5xl">
          <span id="hours"></span>
        </span>
        hours
      </div>

      <div className="flex flex-col p-2 bg-gray-900 rounded-box text-neutral-content shadow-xl shadow-cyan-300/20 ring ring-gray-600/30">
        <span className="countdown font-mono text-5xl">
          <span id="minutes"></span>
        </span>
        min
      </div>

      <div className="flex flex-col p-2 bg-gray-900 rounded-box text-neutral-content shadow-xl shadow-cyan-300/20 ring ring-gray-600/30">
        <span className="countdown font-mono text-5xl">
          <span id="seconds"></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
