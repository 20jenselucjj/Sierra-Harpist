// Configuration management
const config = {
    web3forms: {
        access_key: process.env.WEB3FORMS_ACCESS_KEY || '${WEB3FORMS_ACCESS_KEY}'
    },
    cal: {
        api_key: process.env.CAL_API_KEY || '${CAL_API_KEY}'
    }
};

export default config;