import { Signale } from "signale";

export const logger = new Signale({
  config: {
    displayBadge: false,
    displayFilename: true,
    displayLabel: true,
    displayDate: true,
    displayTimestamp: true,
  },
});
