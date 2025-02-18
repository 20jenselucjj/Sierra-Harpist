// Fetch environmental configuration
const calConfig = {
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