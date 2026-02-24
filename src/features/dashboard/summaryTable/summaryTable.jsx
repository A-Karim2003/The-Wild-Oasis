import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import useTodaysActivities from "../hooks/useTodaysActivities";
import { differenceInDays } from "date-fns";

export function TableDemo() {
  const { activities = [] } = useTodaysActivities();
  console.log(activities);

  return (
    <Card className={"h-full"}>
      {!activities.length && (
        <p className="text-center text-lg text-muted-foreground">
          No activities today
        </p>
      )}
      <Table>
        <TableCaption>Todays activities</TableCaption>
        <TableBody>
          {activities.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === "unconfirmed"
                      ? "bg-gold/20 text-gold-dark"
                      : "bg-gold-dark/20 text-gold-bright"
                  }`}
                >
                  {booking.status === "unconfirmed" ? "ARRIVING" : "DEPARTING"}
                </span>
              </TableCell>

              <TableCell>
                <img
                  src={booking.guests.country_flag}
                  alt={booking.guests.nationality}
                  className="h-5 w-7 object-cover"
                />
              </TableCell>

              <TableCell className="font-medium">
                {booking.guests.name}
              </TableCell>

              <TableCell>
                {differenceInDays(
                  new Date(booking.end_date),
                  new Date(booking.start_date),
                )}{" "}
                nights
              </TableCell>

              <TableCell>
                <button className="rounded bg-gold text-black w-22 py-2 text-xs font-bold hover:bg-gold-bright transition-colors">
                  {booking.status === "unconfirmed" ? "CHECK IN" : "CHECK OUT"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
