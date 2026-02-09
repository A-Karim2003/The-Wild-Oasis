import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Home,
  MessageSquare,
  Utensils,
  DollarSign,
  MoveLeft,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function BookingDetails() {
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Booking #2719</h2>

        <Button
          variant="ghost"
          className={"flex items-center gap-2 cursor-pointer"}
          onClick={() => navigate(-1)}
        >
          <MoveLeft className="text-gold-accent size-3xl " />
          Back
        </Button>
      </div>
      {/* Header Card */}
      <Card className="p-0 my-6">
        <div className="bg-gold-accent  text-white rounded-lg p-4 flex items-start gap-4">
          <Home className="w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold">3 nights in Cabin 008</h2>
            <p className="text-indigo-100 mt-1">
              Fri, Dec 27 2030 (in almost 5 years) — Mon, Dec 30 2030
            </p>
          </div>
        </div>
        <div className="space-y-6 p-4">
          {/* Guest Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <img
                src="https://flagcdn.com/w40/br.png"
                alt="Brazil flag"
                className="w-6 h-4"
              />
              <span className="font-medium">rises sky + 9 guests</span>
              <span className="text-gray-400">•</span>
              <span>risessky@gmail.com</span>
              <span className="text-gray-400">•</span>
              <span>Nationality ID asghar</span>
            </div>

            {/* Observations */}
            <div className="flex items-start gap-3 text-gray-700 ">
              <MessageSquare className="text-gold-accent size-3xl" />
              <div className="flex items-center gap-5">
                <span className="font-medium">Observations</span>
                <p className="text-gray-600">yess i am asghar</p>
              </div>
            </div>

            {/* Breakfast */}
            <div className="flex items-center gap-3 text-gray-700">
              <Utensils className="text-gold-accent size-3xl" />
              <div>
                <span className="font-medium">Breakfast included?</span>
                <span className="ml-4 text-gray-600">No</span>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-700" />
              <div>
                <span className="text-gray-600">Total price</span>
                <span className="ml-4 text-xl font-semibold text-gray-900">
                  $4,200.00
                </span>
              </div>
            </div>
            <span className="text-yellow-700 font-semibold">
              WILL PAY AT PROPERTY
            </span>
          </div>

          {/* Booking Timestamp */}
          <div className="text-right text-sm text-gray-500">
            Booked Tue, May 13 2025, 12:08 PM
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
          Check in
        </Button>
        <Button variant="destructive">Delete booking</Button>
        <Button variant="outline">Back</Button>
      </div>
    </div>
  );
}
