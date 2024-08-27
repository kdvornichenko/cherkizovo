module.exports = {
    plugins: [
        {
            name: 'removeAttrs',
            params: {
                attrs: ['width', 'height'],
            }
        },
        {
            name: 'removeTitle',
        },
        { 
            name: 'convertColors',
            params: {
                currentColor: true
            },
        }
    ],
};
