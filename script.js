const menuData = [
    {
        category: "وجبات الدجاج",
        items: [
            { name: "دجاج كاجون", price: "19 ر.س" },
            { name: "فاهيتا دجاج", price: "19 ر.س" },
            { name: "صدر دجاج مشوي", price: "18 ر.س" },
            { name: "كاري دجاج", price: "19 ر.س" },
            { name: "دجاج بالفطر", price: "21 ر.س" },
            { name: "دجاج بالبيستو", price: "22 ر.س" },
            { name: "تيكا بالفريكة", price: "19 ر.س" },
            { name: "ستروكنوف دجاج", price: "20 ر.س" },
            { name: "دجاج بالزبدة", price: "20 ر.س" },
            { name: "برياني", price: "19 ر.س" },
            { name: "كوردن بلو", price: "20 ر.س" }
        ]
    },
    {
        category: "وجبات اللحم",
        items: [
            { name: "كرات اللحم", price: "27 ر.س" },
            { name: "ستيك لحم", price: "27 ر.س" },
            { name: "فاهيتا لحم", price: "28 ر.س" },
            { name: "كاري لحم", price: "27 ر.س" },
            { name: "روست بیف", price: "28 ر.س" },
            { name: "كفتة بالطحينة", price: "28 ر.س" },
            { name: "ستروكونوف لحم", price: "26 ر.س" }
        ]
    },
    {
        category: "وجبات الأسماك",
        items: [
            { name: "فيلية سمك", price: "22 ر.س" },
            { name: "سلمون", price: "30 ر.س" },
            { name: "بیلا روبیان", price: "30 ر.س" }
        ]
    },
    {
        category: "الساندويشات",
        items: [
            { name: "فاهيتا دجاج", price: "10 ر.س" },
            { name: "سيزر دجاج", price: "10 ر.س" },
            { name: "شاورما دجاج", price: "11 ر.س" },
            { name: "برجر دجاج", price: "10 ر.س" },
            { name: "برجر لحم", price: "16 ر.س" },
            { name: "برجر لحم سويس", price: "17 ر.س" },
            { name: "ستيك تشيز لحم", price: "16 ر.س" },
            { name: "شاورما لحم", price: "13 ر.س" },
            { name: "حلوم بیستو برجر", price: "13 ر.س" },
            { name: "وجبة زنجر", price: "19 ر.س" }
        ]
    },
    {
        category: "الباستا",
        items: [
            { name: "لازانيا", price: "24 ر.س" },
            { name: "فوتوشيني الفريدو", price: "23 ر.س" },
            { name: "سباغيتي بولونيز", price: "23 ر.س" }
        ]
    },
    {
        category: "السلطات",
        items: [
            { name: "سلطة روبيان", price: "13 ر.س" },
            { name: "سلطة الباستا", price: "10 ر.س" },
            { name: "كرانشي سلط", price: "10 ر.س" },
            { name: "شمندر وجرجير", price: "12 ر.س" },
            { name: "سلطة المانجو", price: "12 ر.س" },
            { name: "سلطة سيزر", price: "10 ر.س" },
            { name: "سلطة البوملي", price: "11 ر.س" },
            { name: "کراب سلط", price: "13 ر.س" },
            { name: "جكاوا سلاط", price: "11 ر.س" }
        ]
    },
    {
        category: "الحلويات",
        items: [
            { name: "ليزي كيك", price: "6 ر.س" },
            { name: "تشيز كيك", price: "7 ر.س" },
            { name: "بودينق تشوكليت", price: "7 ر.س" },
            { name: "بودينق مانجو", price: "7 ر.س" },
            { name: "بودينق تمر", price: "7 ر.س" },
            { name: "بودينق فراولة", price: "7 ر.س" },
            { name: "كرات التمر", price: "7 ر.س" },
            { name: "كاسترد", price: "6 ر.س" },
            { name: "غراونلا بالزبادي", price: "15 ر.س" }
        ]
    },
    {
        category: "المشروبات",
        items: [
            { name: "غازيات", price: "3.5 ر.س" },
            { name: "عصير", price: "3 ر.س" },
            { name: "ماء", price: "2 ر.س" }
        ]
    },
    {
        category: "باقات الاشتراكات",
        items: [
            { name: "اشتراك (وجبة + سناك)", price: "550 ر.س" },
            { name: "اشتراك (وجبتين + سناك)", price: "1100 ر.س" },
            { name: "اشتراك (ثلاث وجبات + سناك)", price: "1400 ر.س" }
        ]
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
    menuListEl.innerHTML = '';
    menuData.forEach(category => {
        // Create category wrapper
        const catDiv = document.createElement('div');
        catDiv.className = 'menu-category';
        
        // Add category title
        const titleEl = document.createElement('h3');
        titleEl.className = 'category-title';
        titleEl.textContent = category.category;
        catDiv.appendChild(titleEl);
        
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'items-grid';
        
        // Add items
        category.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';
            
            if (typeof item === 'object') {
                itemDiv.innerHTML = `
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${item.price}</span>
                `;
                itemDiv.addEventListener('click', () => {
                    chatInputEl.value = `أريد طلب ${item.name}`;
                    chatInputEl.focus();
                });
            } else {
                itemDiv.innerHTML = `<span class="item-name">${item}</span>`;
            }
            
            itemsGrid.appendChild(itemDiv);
        });
        
        catDiv.appendChild(itemsGrid);
        menuListEl.appendChild(catDiv);
    });
}

// Add Message to Chat
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    
    let avatarHtml = '';
    if (sender === 'bot') {
        avatarHtml = `<div class="avatar ai-avatar"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/></svg></div>`;
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
        <div class="avatar ai-avatar"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/></svg></div>
        <div style="display:flex; flex-direction:column; gap:0.5rem; align-items: flex-start;">
            <div class="typing-indicator" style="display: block;">
                <span></span><span></span><span></span>
            </div>
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

// Mobile Sidebar Toggle Logic removed

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});
