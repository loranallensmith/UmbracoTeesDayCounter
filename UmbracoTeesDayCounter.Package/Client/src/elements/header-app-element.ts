import type { CSSResultGroup } from '@umbraco-cms/backoffice/external/lit';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbHeaderAppButtonElement } from '@umbraco-cms/backoffice/components';

const elementName = 'umbraco-tees-header-app';
@customElement(elementName)
export class UmbracoTeesHeaderAppElement extends UmbHeaderAppButtonElement {
	// @state()
	// private _popoverOpen = false;

    @state()
    private _dates: string[] = [];

    @state()
    private _timeLeft: number = 0;

    private timerInterval: number | null = null;

	constructor() {
		super();

		// Fetch the dateFile from https://github.com/OwainWilliams/UmbracoTeesDay/raw/refs/heads/main/datesFolder/dates.json
        fetch('https://api.github.com/repos/OwainWilliams/UmbracoTeesDay/contents/datesFolder/dates.json')
            .then(response => response.json())
            .then(data => {
                const decodedContent = atob(data.content);
                this._dates = JSON.parse(decodedContent);
                this._timeLeft = (Date.parse(this.#findClosestDate()) - Date.now())/ 1000;
            })
            .catch(error => console.error(error));
	}

    connectedCallback() {
        super.connectedCallback();
        this.#startCountdown();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#stopCountdown();
    }

    #startCountdown() {
        if (this.timerInterval) return; // Prevent multiple intervals
        
        this.timerInterval = setInterval(() => {
            if (this._timeLeft > 0) {
                this._timeLeft -= 1;
            } else {
                this.#stopCountdown();
            }
          }, 1000);
    }

    #stopCountdown() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    get formattedTimeLeft() {
        let seconds = Math.floor(this._timeLeft);
        const weeks = Math.floor(seconds / (60 * 60 * 24 * 7));
        seconds %= 60 * 60 * 24 * 7;
        const days = Math.floor(seconds / (60 * 60 * 24));
        seconds %= 60 * 60 * 24;
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return { weeks, days, hours, minutes, seconds };
    }

	#onPopoverToggle(event: ToggleEvent) {
		// TODO: This ignorer is just needed for JSON SCHEMA TO WORK, As its not updated with latest TS jet.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this._popoverOpen = event.newState === 'open';
	}

    #findClosestDate() {
        var now = new Date();
        var closestDate = this._dates[0];
        
        for (var i = 1; i < this._dates.length; i++) {
            var currentDate = Date.parse(this._dates[i]);
			if (currentDate > now.getTime() && currentDate < Date.parse(closestDate)) {
            closestDate = this._dates[i];
            }
        }
        return closestDate;
    }

    #shouldSparkle() {
        return this._timeLeft <= 1000 * 60 * 60 * 24 * 14;
    }

	override render() {
		return html` ${this.#renderButton()} ${this.#renderPopover()} `;
	}

	#renderButton() {

		return html`
			<uui-button popovertarget="tees-menu-popover" look="primary" label="help" class=${this.#shouldSparkle() ? 'sparkle' : ''} compact>
				<uui-icon name="icon-t-shirt"></uui-icon>
			</uui-button>
		`;
	}

	#renderPopover() {
		return html`
			<uui-popover-container id="tees-menu-popover" @toggle=${this.#onPopoverToggle}>
				<umb-popover-layout>
					<uui-scroll-container>
						<div>
                            ${this.#renderInfo()}
                        </div>
                        <div>
                            <small>
                                Visit the <a href="https://umbracocommunity.store" target="_blank">Umbraco Community Store</a> and get yours today!
                            </small>
                        </div>
					</uui-scroll-container>
				</umb-popover-layout>
			</uui-popover-container>
		`;
	}

    #renderInfo() {
            const closestDate = this.#findClosestDate();
        
            // Check if the closest date is today
            var today = new Date();
            today.setHours(0, 0, 0, 0);
        
            var closestDateTime = new Date(closestDate);
            closestDateTime.setHours(0, 0, 0, 0);
        
            if (closestDateTime.getTime() === today.getTime()) {
                // It's today
                return this.#renderTodayIsTheDay();
            }
        
            // Calculate the countdown for the closest date
            var future = Date.parse(closestDate);
            var now = new Date();
        
            if (isNaN(future) || future <= now.getTime()) {
                return this.#renderNothingScheduled();
            }
            
            return this.#renderComingSoonCountdown();
        }

    #renderNothingScheduled() {
        return html`<p>There's not an upcoming Umbraco Tees at the moment, check back soon!</p>`;
    }

    #renderTodayIsTheDay() {
        return html`<p>Today is Umbraco Tees Day!</p>`;
    }

    #renderComingSoonCountdown() {
        const { weeks, days, hours, minutes, seconds } = this.formattedTimeLeft;
        const formattedClosestDate = new Date(this.#findClosestDate()).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        return html`
            <p>The next Umbraco Tees Day is happening in:</p>
            <p><b>
                ${weeks > 0 ? html`${weeks}<span> weeks</span>` : ''}
                ${days > 0 ? html`${days}<span> days, </span>` : ''}
                ${hours > 0 ? html`${hours}<span> hours, </span>` : ''}
                ${minutes}<span> minutes, and </span>
                ${seconds}<span> seconds </span>
            </b></p>
            <p>on ${formattedClosestDate}.</p>
        `
    }

	static override styles: CSSResultGroup = [UmbHeaderAppButtonElement.styles, css`
        uui-popover-container div {
            padding: 1em 16px;
            text-align: center;
        }

        /* Sparkle effect applied when countdown is under two weeks */
        .sparkle::before,
        .sparkle::after {
        content: "";
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 200, 0.9);
        border-radius: 50%;
        box-shadow: 
            0px 0px 8px 2px rgba(255, 255, 200, 0.8),
            2px 2px 4px rgba(255, 255, 150, 0.5);
        animation: sparkle-animation 1.5s infinite ease-in-out alternate;
        }

        .sparkle::before {
        top: 3px;
        left: 6px;
        animation-delay: 0s;
        }

        .sparkle::after {
        bottom: 5px;
        right: 5px;
        animation-delay: 0.75s;
        }

        @keyframes sparkle-animation {
        0% {
            transform: scale(0.8);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(0.6);
            opacity: 0.6;
        }
        }
        `];
}

export { UmbracoTeesHeaderAppElement as element };

declare global {
	interface HTMLElementTagNameMap {
		[elementName]: UmbracoTeesHeaderAppElement;
	}
}