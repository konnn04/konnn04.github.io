<script>
    import profile from '../../data/profile.json';
</script>

<section id="contact" class="container" style="padding-top: 100px;">
    <div class="container">
        <div class="row">
            <div class="col-md-4 d-flex justify-content-center align-items-center">
                <div class="character-container  wow">
                    <img src="./img/pointing.jpg" alt="Contact Character" class="character-image" style="max-width: 100%; max-height: 350px; object-fit: contain;" />
                </div>
            </div>
            
            <div class="col-md-8">
                <div class="contact-content">
                    <h2 class="section-title wow">Want to get in touch?</h2>
                    <p class="section-description mb-4 wow">Feel free to contact me through any of these platforms:</p>
                    
                    <div class="contact-info">
                        <div class="contact-item wow">
                            <div class="contact-icon">
                                <i class="bi bi-envelope-fill"></i>
                            </div>
                            <div class="contact-detail">
                                <h4>Email</h4>
                                <a href="mailto:{profile.email}">{profile.email}</a>
                            </div>
                        </div>
                        
                        <div class="contact-item wow">
                            <div class="contact-icon">
                                <i class="bi bi-discord"></i>
                            </div>
                            <div class="contact-detail">
                                <h4>Discord</h4>
                                <a href="{profile.socials.discord.link}">{profile.socials.discord.username}</a>
                            </div>
                        </div>
                        
                        <div class="contact-item wow">
                            <div class="contact-icon">
                                <i class="bi bi-github"></i>
                            </div>
                            <div class="contact-detail">
                                <h4>GitHub</h4>
                                <a href="{profile.socials.github.link}">{profile.socials.github.username}</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="social-links">
                        <a href="mailto:{profile.email}" class="social-link wow">
                            <i class="bi bi-envelope-fill"></i>
                        </a>
                        <a href="{profile.socials.facebook.link}" class="social-link wow">
                            <i class="bi bi-facebook"></i>
                        </a>
                        <a href="{profile.socials.linkedin.link}" class="social-link wow">
                            <i class="bi bi-linkedin"></i>
                        </a>
                        <a href="{profile.socials.github.link}" class="social-link wow">
                            <i class="bi bi-github"></i>
                        </a>
                        <a href="{profile.socials.discord.link}" class="social-link wow">
                            <i class="bi bi-discord"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .section-title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, #ffffff, #dbdbdb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-description {
        font-size: 1.1rem;
        opacity: 0.8;
        max-width: 700px;
    }

    .character-container {
        position: relative;
        /* height: 100%; */
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .character-image {
        max-height: 350px;
        object-fit: contain;
        filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
        animation: float 3s ease-in-out infinite;
        border-radius: 1rem;
    }

    .character-placeholder {
        font-size: 8rem;
        color: rgba(255, 255, 255, 0.2);
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-15px);
        }
    }

    .contact-content {
        /* padding: 1.5rem; */
    }

    .contact-info {
        margin-bottom: 2rem;
    }

    .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 1rem;
        transition: transform 0.3s, background 0.3s;
    }

    .contact-item:hover {
        transform: translateY(-5px);
        background: rgba(0, 0, 0, 0.3);
    }

    .contact-icon {
        width: 50px;
        height: 50px;
        min-width: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
    }

    .contact-icon i {
        font-size: 1.5rem;
        color: #ffffff;
    }

    .contact-detail h4 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .contact-detail a {
        color: #ffffff;
        text-decoration: none;
        opacity: 0.8;
        transition: opacity 0.3s;
    }

    .contact-detail a:hover {
        opacity: 1;
        text-decoration: underline;
    }

    .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .social-link {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .social-link:hover {
        transform: translateY(-5px);
    }

    .social-link i {
        font-size: 1.25rem;
    }

    .social-link:nth-child(1):hover {
        background-color: #d14836;
    }

    .social-link:nth-child(2):hover {
        background-color: #3b5998;
    }

    .social-link:nth-child(3):hover {
        background-color: #0077b5;
    }

    .social-link:nth-child(4):hover {
        background-color: #333;
    }

    .social-link:nth-child(5):hover {
        background-color: #5865F2;
    }

    @media (max-width: 768px) {
        .row {
            flex-direction: column-reverse;
        }
        
        .character-container {
            margin-top: 2rem;
        }
        
        .character-image {
            max-height: 200px;
        }
    }
</style>