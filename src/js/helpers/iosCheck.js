const isMobileIos = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

    return (/iPhone/i.test(navigator.userAgent || navigator.vendor || (window.opera && opera.toString() === '[object Opera]'))) || navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1;
};

export default isMobileIos;