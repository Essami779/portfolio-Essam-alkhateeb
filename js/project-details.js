document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (projectId && projectsData[projectId]) {
        const data = projectsData[projectId];
        
        // Fill elements
        document.getElementById('project-title').textContent = data.title;
        document.getElementById('project-title-top').textContent = data.title;
        document.getElementById('project-description').textContent = data.description;
        document.getElementById('main-display-img').src = data.image;
        
        document.getElementById('user-text').textContent = data.user;
        document.getElementById('pass-text').textContent = data.pass;
        
        document.getElementById('official-btn').href = data.officialLink;
        document.getElementById('demo-btn').href = data.demoLink;

        // Hide links if they are "#"
        if (data.officialLink === "#") document.getElementById('official-btn').style.display = 'none';
        if (data.demoLink === "#") document.getElementById('demo-btn').style.display = 'none';

        // Load Gallery
        const thumbContainer = document.getElementById('gallery-thumbs');
        thumbContainer.innerHTML = '';
        
        data.gallery.forEach((imagesrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imagesrc;
            thumb.className = index === 0 ? 'thumb-img active' : 'thumb-img';
            thumb.onclick = () => {
                document.getElementById('main-display-img').src = imagesrc;
                document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
            thumbContainer.appendChild(thumb);
        });
    } else {
        // Handle project not found or no ID
        document.querySelector('.details-container').innerHTML = `
            <div style="text-align:center; width: 100%; padding: 50px;">
                <h2>Project Not Found</h2>
                <p>Sorry, we couldn't find the project you are looking for.</p>
                <a href="index.html#projects" class="back-link">Back to Projects</a>
            </div>
        `;
    }
});

// Copy Text Function
function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
        }, 2000);
    });
}
