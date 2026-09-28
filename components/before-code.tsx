import { beforeCode } from "@/lib/resume";
import { siteConfig } from "@/lib/site.config";

/** The pre-tech career, set like a small accounting ledger. */
export function BeforeCode() {
  return (
    <div className="card border-dashed border-line-strong p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-[17px] font-semibold">Before code</h3>
        <span className="font-mono text-xs uppercase tracking-[0.04em] text-faint">
          Balance carried forward
        </span>
      </div>

      <table className="mt-3.5 w-full border-collapse text-[13px] sm:text-sm">
        <thead>
          <tr>
            {["Period", "Role", "What I carried into dev work"].map(
              (heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="border-b border-line py-2 pr-3 text-left align-bottom font-mono text-[11px] font-medium uppercase leading-tight tracking-[0.06em] text-faint last:pr-0"
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {beforeCode.map((row) => (
            <tr key={row.period}>
              <td className="whitespace-nowrap border-b border-line py-3 pr-3 align-top font-mono tabular-nums text-faint">
                {row.period}
              </td>
              <td className="border-b border-line py-3 pr-3 align-top text-muted">
                <b className="block font-medium text-fg">{row.role}</b>
                {row.company}
              </td>
              <td className="border-b border-line py-3 align-top text-fg">
                {row.carried}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="-mt-px flex flex-wrap justify-between gap-3 border-t-[3px] border-double border-line-strong pt-3.5 font-mono text-[13px] font-medium">
        <span>Total</span>
        <span className="text-ink">
          8 yrs business + {siteConfig.experienceYears} yrs frontend
        </span>
      </p>
    </div>
  );
}
