import { ResumeDialog } from "@/components/resume-dialog";
import { ResumeSheet } from "@/components/resume-sheet";

/** /resume opened from inside the site: show it as a dialog over the page. */
export default function ResumeModal() {
  return (
    <ResumeDialog titleId="resume-dialog-title">
      <ResumeSheet titleId="resume-dialog-title" />
    </ResumeDialog>
  );
}
