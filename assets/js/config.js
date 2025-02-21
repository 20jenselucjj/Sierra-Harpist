// Configuration management
const config = {
    web3forms: {
        // Replace this with your actual Web3Forms access key
        access_key: '031d7316-27c7-4f63-92d5-e47258ac0dd8' // Get your access key from https://web3forms.com/
    },
    cal: {
        api_key: process.env.CAL_API_KEY || '${CAL_API_KEY}'
    }
};

export default config;