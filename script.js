// Menu Data based on the provided Foodics menu link
const menuData = [
    {
        category: "وجبات الدجاج",
        items: [
            "دجاج كاجون", "فاهيتا دجاج", "صدر دجاج مشوي", "دجاج كاري", 
            "كوردون بلو دجاج", "برياني", "دجاج بالفطر", "دجاج بالبيستو", 
            "تيكا دجاج بالفريكة", "ستروكنوف دجاج", "دجاج بالزبدة", "وجبة زنجر"
        ]
    },
    {
        category: "وجبات اللحوم",
        items: ["لحم بالخضار", "كباب لحم مشوي", "ستيك لحم", "كرات اللحم"]
    },
    {
        category: "وجبات السمك",
        items: ["سلمون مشوي", "فيليه سمك", "روبيان مشوي"]
    },
    {
        category: "السندوتشات",
        items: ["كلوب ساندوتش", "ساندوتش دجاج مشوي", "ساندوتش تونة"]
    },
    {
        category: "سلاط",
        items: ["سلطة سيزر", "سلطة يونانية", "سلطة كينوا", "تبولة"]
    },
    {
        category: "باستا",
        items: ["باستا بيستو", "باستا دجاج ألفريدو", "سباغيتي بولونيز"]
    },
    {
        category: "الحلويات",
        items: ["بودينج الشوفان", "تشيز كيك بالفراولة", "ليزي كيك", "غرانولا بالزبادي اليوناني", "كاسترد", "كرات طاقة التمر"]
    },
    {
        category: "مشروبات",
        items: ["عصير برتقال طازج", "عصير ليمون نعناع", "مياه معدنية", "شاي أخضر"]
    },
    {
        category: "الاشتراكات",
        items: ["باقة خسارة الوزن", "باقة بناء العضلات", "الباقة المتوازنة"]
    }
];

// Placeholder Webhook URL - Replace this with the actual n8n webhook URL
const WEBHOOK_URL = "https://vmi3205484.contaboserver.net/webhook/37aed5fa-39f8-47d5-ac69-89cb33adeb8d";

// DOM Elements
const menuListEl = document.getElementById('menu-list');
const mainMenuToggleBtn = document.getElementById('main-menu-toggle');
const chatMessagesEl = document.getElementById('chat-messages');
const chatFormEl = document.getElementById('chat-form');
const chatInputEl = document.getElementById('chat-input');
const imageUploadEl = document.getElementById('image-upload');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreviewEl = document.getElementById('image-preview');
const removeImageBtn = document.getElementById('remove-image');

let selectedImageBase64 = null;

// Handle Main Menu Accordion
if (mainMenuToggleBtn) {
    mainMenuToggleBtn.addEventListener('click', () => {
        const isHidden = menuListEl.style.display === 'none';
        menuListEl.style.display = isHidden ? 'block' : 'none';
        mainMenuToggleBtn.classList.toggle('open', isHidden);
    });
}

// Render Menu
function renderMenu() {
    menuData.forEach(category => {
        // Create category wrapper
        const catDiv = document.createElement('div');
        catDiv.className = 'menu-category';
        
        // Add category title
        const titleEl = document.createElement('h3');
        titleEl.className = 'category-title';
        titleEl.textContent = category.category;
        catDiv.appendChild(titleEl);
        
        // Add items
        category.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';
            itemDiv.innerHTML = `<span class="item-name">${item}</span>`;
            
            // Optional: clicking an item could send a message about it
            itemDiv.addEventListener('click', () => {
                chatInputEl.value = `أريد معرفة المزيد عن ${item}`;
                chatInputEl.focus();
            });
            
            catDiv.appendChild(itemDiv);
        });
        
        menuListEl.appendChild(catDiv);
    });
}

// Add Message to Chat
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    
    let avatarHtml = '';
    if (sender === 'bot') {
        avatarHtml = `<div class="avatar"><img src="logo.png" alt="Bot"></div>`;
    } else {
        avatarHtml = `<div class="avatar">أنت</div>`;
    }
    
    let contentHtml = text ? `<div class="bubble">${text}</div>` : '';
    
    msgDiv.innerHTML = `
        ${avatarHtml}
        <div style="display:flex; flex-direction:column; gap:0.5rem; align-items: ${sender === 'user' ? 'flex-end' : 'flex-start'};">
            ${contentHtml}
        </div>
    `;
    
    // Insert before typing indicator if it exists
    const typingInd = document.getElementById('typing-indicator');
    if (typingInd) {
        chatMessagesEl.insertBefore(msgDiv, typingInd);
    } else {
        chatMessagesEl.appendChild(msgDiv);
    }
    
    scrollToBottom();
}

function showTypingIndicator() {
    // Remove old if exists
    hideTypingIndicator();
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="avatar"><img src="logo.png" alt="Bot"></div>
        <div class="typing-indicator" style="display: block;">
            <span></span><span></span><span></span>
        </div>
    `;
    chatMessagesEl.appendChild(typingDiv);
    scrollToBottom();
}

function hideTypingIndicator() {
    const typingInd = document.getElementById('typing-indicator');
    if (typingInd) typingInd.remove();
}

function scrollToBottom() {
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

// Handle Image Selection
imageUploadEl.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        selectedImageBase64 = event.target.result;
        imagePreviewEl.src = selectedImageBase64;
        imagePreviewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

// Remove Selected Image
removeImageBtn.addEventListener('click', () => {
    selectedImageBase64 = null;
    imagePreviewEl.src = '';
    imagePreviewContainer.style.display = 'none';
    imageUploadEl.value = '';
});

// Add Message to Chat (modified to support image)
function addUserMessageWithImage(text, imgBase64) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message user-message`;
    
    let contentHtml = '';
    if (imgBase64) {
        contentHtml += `<img src="${imgBase64}" style="max-width: 200px; border-radius: 8px; margin-bottom: 0.5rem;">`;
    }
    if (text) {
        contentHtml += `<div class="bubble">${text}</div>`;
    }
    
    msgDiv.innerHTML = `
        <div class="avatar">أنت</div>
        <div style="display:flex; flex-direction:column; align-items:flex-end;">
            ${contentHtml}
        </div>
    `;
    
    const typingInd = document.getElementById('typing-indicator');
    if (typingInd) {
        chatMessagesEl.insertBefore(msgDiv, typingInd);
    } else {
        chatMessagesEl.appendChild(msgDiv);
    }
    
    scrollToBottom();
}

// Handle Form Submit
chatFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = chatInputEl.value.trim();
    const hasImage = !!selectedImageBase64;
    
    if (!message && !hasImage) return;
    
    // Add user message with or without image
    addUserMessageWithImage(message, selectedImageBase64);
    
    const payloadImage = selectedImageBase64; // Store for payload
    
    chatInputEl.value = '';
    removeImageBtn.click(); // Reset image upload
    
    // Show typing
    showTypingIndicator();
    
    try {
        // Send to Webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId: 'user-' + Math.random().toString(36).substr(2, 9),
                message: message,
                image: payloadImage,
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            hideTypingIndicator();
            // Assuming webhook returns { reply: "..." }
            const botReply = data.reply || "تم استلام رسالتك بنجاح. سنقوم بالرد عليك قريباً.";
            addMessage(botReply, 'bot');
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error connecting to webhook:', error);
        hideTypingIndicator();
        
        // Mock response if webhook fails (for demonstration)
        setTimeout(() => {
            addMessage("عذراً، لا يمكنني الاتصال بالخادم حالياً. هل ترغب في طلب أحد الوجبات من القائمة؟", 'bot');
        }, 500);
    }
});

// Mobile Sidebar Toggle Logic
const menuToggleBtn = document.getElementById('menu-toggle');
const sidebarEl = document.querySelector('.sidebar');
const sidebarOverlayEl = document.getElementById('sidebar-overlay');

if (menuToggleBtn && sidebarEl && sidebarOverlayEl) {
    menuToggleBtn.addEventListener('click', () => {
        sidebarEl.classList.toggle('open');
        sidebarOverlayEl.classList.toggle('show');
    });

    sidebarOverlayEl.addEventListener('click', () => {
        sidebarEl.classList.remove('open');
        sidebarOverlayEl.classList.remove('show');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});
