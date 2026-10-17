import { ResumeDialog } from "@/features/resume/components/ResumeDialog";
import { ResumeSheet } from "@/features/resume/components/ResumeSheet";

/** /resume opened from inside the site: show it as a dialog over the page. */
export default function ResumeModal() {
  return (
    <ResumeDialog titleId="resume-dialog-title">
      <ResumeSheet titleId="resume-dialog-title" />
    </ResumeDialog>
  );
}
