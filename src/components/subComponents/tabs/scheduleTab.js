import { Scheduler } from "@aldabil/react-scheduler";
import moment from "moment";

function ScheduleTab({ schedules }) {
  let alteredSch =
    schedules &&
    schedules.map((i) => {
      return {
        event_id: i._id,
        title: `${i.title} - From ${i.startTime} to ${i.endTime}`,
        start: new Date(
          `${moment(i.date).format("YYYY/MM/DD")} ${i.startTime}`
        ),
        end: new Date(`${moment(i.date).format("YYYY/MM/DD")} ${i.endTime}`),
      };
    });
  return (
    <div>
      <Scheduler
        view="month"
        events={alteredSch}
        editable={false}
        deletable={false}
      />
    </div>
  );
}

export default ScheduleTab;
