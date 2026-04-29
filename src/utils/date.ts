const RELATIVE = new Intl.RelativeTimeFormat("ja", { numeric: "auto" });
const ABSOLUTE = new Intl.DateTimeFormat("ja-JP", {
	year: "numeric",
	month: "numeric",
	day: "numeric",
});

export function formatRelativeFromNow(input: string | Date): string {
	const date = typeof input === "string" ? new Date(input) : input;
	const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
	const absSec = Math.abs(diffSec);

	if (absSec < 60) return RELATIVE.format(diffSec, "second");
	if (absSec < 3600) return RELATIVE.format(Math.round(diffSec / 60), "minute");
	if (absSec < 86_400)
		return RELATIVE.format(Math.round(diffSec / 3_600), "hour");
	if (absSec < 86_400 * 30)
		return RELATIVE.format(Math.round(diffSec / 86_400), "day");
	return ABSOLUTE.format(date);
}
