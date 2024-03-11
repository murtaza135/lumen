import { Tooltip } from 'bootstrap';

export class Tooltips {
  constructor() {
    this.tooltipsList = null;
  }

  initialise() {
    const tooltipsTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipsList = [...tooltipsTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    this.tooltipsList = tooltipsList;
  }

  destroy() {
    this.tooltipsList?.forEach((tooltip) => {
      tooltip.hide();
    });
    this.tooltipsList = null;
  }
}
