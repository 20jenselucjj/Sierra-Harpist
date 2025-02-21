// Cal.com initialization and configuration
const calConfig = {
    eventTypes: {
        wedding: 'WEDDING_EVENT_TYPE_ID',
        reception: 'RECEPTION_EVENT_TYPE_ID',
        event: 'CUSTOM_EVENT_TYPE_ID'
    },
    init: async function() {
        try {
            const response = await fetch('/.well-known/cal-config.json');
            if (!response.ok) throw new Error('Config not available');
            return await response.json();
        } catch (error) {
            console.error('Error loading Cal.com config:', error);
            return null;
        }
    }
};

// Cal.com initialization
(function (C, A, L) { 
    let p = function (a, ar) { a.q.push(ar); }; 
    let d = C.document; 
    C.Cal = C.Cal || function () { 
        let cal = C.Cal; 
        let ar = arguments; 
        if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
        } 
        if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
        } 
        p(cal, ar); 
    }; 
})(window, "https://app.cal.com/embed.js", "init");

Cal("init", "30min", {origin:"https://cal.com"});

Cal.ns["30min"]("inline", {
    elementOrSelector:"#my-cal-inline",
    config: {
        "layout": "month_view",
        "theme": "light",
        "styles": {
            "branding": {
                "brandColor": "#E8B4B8",
                "lightBrand": "#D4AF37"
            }
        },
        "hideEventTypeDetails": false,
        "hideBranding": true
    },
    calLink: "lucas-jensen-rlhgc8/30min"
});

Cal.ns["30min"]("ui", {
    "styles": {
        "branding": {
            "brandColor": "#E8B4B8",
            "lightBrand": "#D4AF37"
        }
    }
});

// Handle errors
Cal.ns["30min"]("on", {
    action: "error",
    callback: (e) => {
        console.error('Cal.com Error:', e);
        document.getElementById('calendar-error').style.display = 'block';
    }
});

let calendarLoadAttempts = 0;
const maxAttempts = 3;

async function loadCalendar() {
    try {
        const config = await calConfig.init();
        if (!config) {
            handleCalendarError();
            return;
        }

        const cal = await getCalApi();
        cal("init", {
            apiKey: config.apiKey
        });
        
        cal("ui", {
            theme: 'dark',
            hideEventTypeDetails: true,
            layout: 'month_view',
            branding: {
                brandColor: '#4A2C6D',
                lightBrand: '#C5A880'
            },
            customLabels: {
                book: 'Reserve Your Date'
            }
        });
        
        cal.on('linkReady', () => {
            document.getElementById('calendar-loader').style.display = 'none';
            document.getElementById('calendar-error').style.display = 'none';
        });

        cal.on('error', () => {
            handleCalendarError();
        });
    } catch (error) {
        handleCalendarError();
    }
}

// Initialize Cal.com embed
window.addEventListener('DOMContentLoaded', function() {
    const calendarElement = document.getElementById('my-cal-inline');
    if (!calendarElement) return;

    // Initialize Cal.com
    Cal('init', {
        origin: "https://app.cal.com",
        debug: false
    });

    // Set up default calendar configuration
    const defaultConfig = {
        elementOrSelector: '#my-cal-inline',
        calLink: 'lucas-jensen-rlhgc8/30min',
        config: {
            layout: 'month_view',
            theme: 'light',
            hideBranding: true,
            hideEventTypeDetails: false,
            styles: {
                branding: {
                    brandColor: '#E8B4B8',
                    lightBrand: '#D4AF37'
                }
            }
        }
    };

    // Initialize the calendar with default config
    Cal('inline', defaultConfig);

    // Store the current event type to prevent unnecessary reloads
    let currentEventType = '';

    // Function to update calendar with specific event type
    window.updateCalendarEventType = function(eventType, packageName) {
        if (currentEventType === eventType) return;
        
        currentEventType = eventType;
        
        Cal('inline', {
            ...defaultConfig,
            config: {
                ...defaultConfig.config,
                prefill: {
                    eventType: eventType,
                    notes: packageName ? `Selected Package: ${packageName}` : ''
                }
            }
        });
    };

    // Error handling
    Cal('on', {
        action: 'error',
        callback: (e) => {
            console.error('Calendar Error:', e);
            document.getElementById('calendar-error').style.display = 'block';
        }
    });

    // Success handling
    Cal('on', {
        action: 'linkReady',
        callback: () => {
            document.getElementById('calendar-error').style.display = 'none';
        }
    });
});

// Function to retry loading the calendar
window.retryCalendarLoad = function() {
    document.getElementById('calendar-error').style.display = 'none';
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed.js';
    script.async = true;
    script.onload = function() {
        window.dispatchEvent(new Event('load'));
    };
    script.onerror = function() {
        document.getElementById('calendar-error').style.display = 'block';
    };
    document.body.appendChild(script);
};