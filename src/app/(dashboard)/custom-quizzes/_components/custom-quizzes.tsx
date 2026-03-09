"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types based on your API response
interface Injury {
  _id: string;
  Primary_Body_Region: string;
}

interface ApiResponse {
  data: Injury[];
}

const CustomQuizzes = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // Form States
  const [examName, setExamName] = useState("");
  const [examTopic, setExamTopic] = useState("");

  // TanStack Query for Injuries
  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["injuries"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/injury/get-all`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: isOpen,
  });

  console.log("data: ", data);

  // Extract unique Primary_Body_Regions for the
  const uniqueRegions = useMemo(() => {
    if (!data?.data) return [];
    const regions = data.data.map((item) => item.Primary_Body_Region);
    return Array.from(new Set(regions));
  }, [data]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setExamName("");
        setExamTopic("");
      }, 300);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900">Custom Quizzes</h1>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 mt-6">
        <div className="border px-5 py-6 rounded-lg bg-white flex items-center justify-between lg:w-1/2 shadow-sm">
          <p className="text-slate-600 lg:max-w-md">
            You can test your knowledge with a timed practice exam using
            randomized questions.
          </p>

          <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button className="bg-[#0e308d] hover:bg-[#0a246b] hover:cursor-pointer">
                New Practice Exam
              </Button>
            </DialogTrigger>

            <DialogContent
              className={`${step === 1 ? "sm:max-w-[800px]" : "sm:max-w-[550px]"} p-8 transition-all duration-300`}
            >
              {step === 1 ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-800">
                      Practice Exam
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    <p className="text-slate-600">
                      MSK Nexus Practice exams are excellent preparation for the
                      ACIM exam.
                    </p>
                    <div className="space-y-5">
                      <div className="flex gap-4">
                        <LayoutGrid className="w-6 h-6 mt-1 text-slate-800 shrink-0" />
                        <p className="text-slate-600">
                          60 randomized questions from across 1 subspecialties
                          based on ABIM exam blueprint.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <Clock className="w-6 h-6 mt-1 text-slate-800 shrink-0" />
                        <p className="text-slate-600">
                          1h 20 minute time limit with the ability to pause the
                          timer.
                        </p>
                      </div>
                      <div className="flex gap-4 text-slate-600">
                        <CheckCircle2 className="w-6 h-6 mt-1 text-slate-800 shrink-0" />
                        <p>Correct answers count toward CME/MOC progress.</p>
                      </div>
                    </div>
                    <p className="font-semibold text-slate-800">Good Luck!</p>
                  </div>

                  <DialogFooter className="flex sm:justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="px-10 border-[#0e308d] text-[#0e308d]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setStep(2)}
                      className="px-10 bg-[#0e308d] hover:bg-[#0a246b]"
                    >
                      Start
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-full border rounded-xl overflow-hidden mb-8 text-lg bg-white">
                    {/* Exam Name Input */}
                    <div className="flex border-b items-center">
                      <div className="w-1/3 p-4 border-r text-slate-700 font-medium">
                        Exam Name :
                      </div>
                      <div className="w-2/3 p-2">
                        <Input
                          placeholder="Enter exam name..."
                          value={examName}
                          onChange={(e) => setExamName(e.target.value)}
                          className="border-none focus-visible:ring-0 text-slate-900 text-lg"
                        />
                      </div>
                    </div>

                    {/* Exam Time (Static) */}
                    <div className="flex border-b items-center">
                      <div className="w-1/3 p-4 border-r text-slate-700 font-medium">
                        Exam Time :
                      </div>
                      <div className="w-2/3 p-4 text-slate-900 font-semibold">
                        01 : 20 : 00
                      </div>
                    </div>

                    {/* Exam Topic Dropdown */}
                    <div className="flex items-center">
                      <div className="w-1/3 p-4 border-r text-slate-700 font-medium">
                        Exam Topic :
                      </div>
                      <div className="w-2/3 p-2">
                        {isLoading ? (
                          <Skeleton className="h-10 w-full rounded-md" />
                        ) : (
                          <Select
                            value={examTopic}
                            onValueChange={setExamTopic}
                          >
                            <SelectTrigger className="border-none focus:ring-0 text-lg shadow-none">
                              <SelectValue placeholder="Select Topic" />
                            </SelectTrigger>
                            <SelectContent>
                              {uniqueRegions.map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={!examName || !examTopic}
                    className="px-12 py-6 bg-[#0e308d] hover:bg-[#0a246b] text-lg rounded-md w-full sm:w-auto"
                  >
                    Confirm
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="border px-5 py-6 rounded-lg bg-white flex items-center justify-between lg:w-1/2 shadow-sm">
          <p className="text-slate-600 lg:max-w-md">
            Create custom quizzes based on specific body regions.
          </p>
          <Button className="bg-[#0e308d] hover:bg-[#0a246b]">
            Create New Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomQuizzes;
