"use client";

import { formatDistanceToNow, isToday, isYesterday, subDays } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { es } from "date-fns/locale";

export default function ImageDatePicker({
  value,
  onValueChange,
}: {
  value: Date;
  onValueChange: (value: Date) => void;
}) {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const lastWeek = subDays(today, 6);
  const last15Days = subDays(today, 15);
  const last30Days = subDays(today, 30);

  const [month, setMonth] = useState(today);
  const [date, setDate] = useState<Date | undefined>(today);

  function formatDate(date: Date) {
    if (isToday(date)) {
      return "Hoy";
    } else if (isYesterday(date)) {
      return "Ayer";
    } else {
      return formatDistanceToNow(date, { locale: es, addSuffix: true });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full capitalize"
        >
          {date ? formatDate(date) : "Seleccionar fecha"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={15}
      >
        <div className="flex max-sm:flex-col">
          <div className="relative py-4 max-sm:order-1 max-sm:border-t sm:w-32">
            <div className="h-full sm:border-e">
              <div className="flex flex-col px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setDate(today);
                    setMonth(today);
                  }}
                >
                  Hoy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setDate(yesterday);
                    setMonth(yesterday);
                  }}
                >
                  Ayer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setDate(lastWeek);
                    setMonth(lastWeek);
                  }}
                >
                  Hace 7 días
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setDate(last15Days);
                    setMonth(last15Days);
                  }}
                >
                  Hace 15 días
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setDate(last30Days);
                    setMonth(last30Days);
                  }}
                >
                  Hace 30 días
                </Button>
              </div>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={value}
            onSelect={(newDate) => {
              if (newDate) {
                onValueChange(newDate)
                setDate(newDate);
              }
            }}
            month={month}
            onMonthChange={setMonth}
            locale={es}
            className="p-2"
            disabled={[
              { after: today }, // Dates before today
            ]}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
