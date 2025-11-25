document.addEventListener('DOMContentLoaded', function() {
    initializeNavLinks();
    initializeImageLinks();
    initializeScrollLinks();
    initializeDropdown();
    loadDynamicHeaderImage(); // 加载API图片
});

// 初始化导航链接
function initializeNavLinks() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            scrollToElement(link.getAttribute('href').substring(1));
        });
    });
}

// 初始化图片链接
function initializeImageLinks() {
    document.querySelectorAll('.image-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            createModal(link.querySelector('img').src);
        });
    });
}

// 创建模态窗口显示图片
function createModal(imgSrc) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const newImg = document.createElement('img');
    newImg.src = imgSrc;
    newImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
    `;

    modal.appendChild(newImg);
    document.body.appendChild(modal);
    modal.addEventListener('click', () => document.body.removeChild(modal));
}

// 初始化回到顶部链接
function initializeScrollLinks() {
    const topLink = document.getElementById('top-link');
    if (topLink) {
        topLink.addEventListener('click', event => {
            event.preventDefault();
            scrollToElement('hero');
        });
    } else {
        console.warn('回到顶部链接未找到');
    }
}

// 平滑滚动到指定ID的元素
function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn(`ID为 ${id} 的元素未找到`);
    }
}

// 初始化下拉菜单
function initializeDropdown() {
    const portfolioDropdown = document.getElementById('portfolio-dropdown');
    const dropdownContent = document.getElementById('dropdown-content');

    if (portfolioDropdown && dropdownContent) {
        portfolioDropdown.addEventListener('click', event => {
            event.preventDefault();
            dropdownContent.classList.toggle('active');
        });

        document.addEventListener('click', event => {
            if (!portfolioDropdown.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove('active');
            }
        });
    } else {
        console.warn('作品集下拉菜单元素未找到');
    }
}

// 从API加载动态图片
function loadDynamicHeaderImage() {
    const apiUrl = "https://cn.apihz.cn/api/img/apihzimgbz.php?id=88888888&key=88888888&type=1&imgtype=2";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);  // 调试输出

            if (data.code === 200) { // 确保API请求成功
                const imgUrl = data.msg; // 提取图片URL
                const hero = document.getElementById('hero'); // 获取页面元素
                hero.innerHTML = `<img src="${imgUrl}" alt="背景图片" style="width: 100%; height: auto;">`; // 更新图片
            } else {
                console.error('API请求失败：', data.msg); // 日志错误信息
            }
        })
        .catch(error => {
            console.error('Error fetching the image:', error); // 捕获错误
        });
}
