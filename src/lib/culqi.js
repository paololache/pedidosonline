export function initCulqi(publicKey) {
  return new Promise((resolve) => {
    if (window.Culqi) {
      resolve(window.Culqi);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.onload = () => {
      window.Culqi.publicKey = publicKey;
      resolve(window.Culqi);
    };
    document.body.appendChild(script);
  });
}

export function createCulqiToken(cardData) {
  return new Promise((resolve, reject) => {
    window.Culqi.token((token) => {
      if (token.object === 'error') {
        reject(new Error(token.user_message || 'Error al generar token'));
      } else {
        resolve(token.id);
      }
    }, cardData);
  });
}
