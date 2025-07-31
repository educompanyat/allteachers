document.addEventListener('DOMContentLoaded', function() {
    // 카테고리별 페이지 URL 매핑 (겹치는 카테고리는 같은 URL)
    const categoryPages = {
        // 기업 언어교육
        '영어회화': 'pages/english-conversation.html',
        '비즈니스 영어': 'pages/business-english.html',
        '영어 자격증': 'pages/english-certification.html',
        '중국어회화': 'pages/chinese-conversation.html',
        '비즈니스 중국어': 'pages/business-chinese.html',
        '중국어 자격증': 'pages/chinese-certification.html',
        '일본어회화': 'pages/japanese-conversation.html',
        '비즈니스 일본어': 'pages/business-japanese.html',
        '일본어 자격증': 'pages/japanese-certification.html',
        '제2외국어': 'pages/second-language.html',

        // 공통 카테고리 (같은 페이지로 이동)
        'AI/인공지능': 'pages/ai-artificial-intelligence.html',
        '프로그래밍': 'pages/programming.html',
        '데이터사이언스': 'pages/data-science.html',
        '리더십/커뮤니케이션': 'pages/leadership-communication.html',
        '영업/서비스': 'pages/sales-service.html',
        '비즈니스/기획': 'pages/business-planning.html',
        '업무 생산성': 'pages/productivity.html',
        '마케팅': 'pages/marketing.html',
        '디자인': 'pages/design.html',
        '영상/미디어': 'pages/video-media.html',

        // 중등/고등교육 전용
        '진로/적성': 'pages/career-aptitude.html',
        '취업/창업': 'pages/employment-startup.html',
        '인성/자아': 'pages/personality-self.html',
        '사회/경제': 'pages/society-economy.html',
        '인문학/교양': 'pages/humanities-culture.html',
        '영어자격증': 'pages/english-certification-teen.html'
    };

    // 강좌별 페이지 매핑
    const coursePages = {
        '비즈니스 중국어': 'pages/course-chinese.html',
        '비즈니스 일본어': 'pages/course-japanese.html',
        '비즈니스 영어': 'pages/course-english.html',
        '창업과 리더십': 'pages/course-startup.html',
        '진로 설계': 'pages/course-career.html',
        '취업 준비': 'pages/course-employment.html',
        'AI 기초 입문': 'pages/course-ai-basic.html',
        '머신러닝 실습': 'pages/course-machine-learning.html',
        'ChatGPT 활용': 'pages/course-chatgpt.html',
        '디지털 마케팅': 'pages/course-digital-marketing.html',
        '데이터 분석': 'pages/course-data-analysis.html',
        'UX/UI 디자인': 'pages/course-ux-ui.html'
    };

    // 배너 슬라이드 요소들
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    let slideInterval;

    // 슬라이드 변경 함수
    function showSlide(index) {
        // 모든 슬라이드 비활성화
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 현재 슬라이드 활성화
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentSlide = index;
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // 이전 슬라이드로 이동
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // 자동 슬라이드 시작 (7초 간격)
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 7000);
    }

    // 자동 슬라이드 정지
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // 화살표 버튼 이벤트
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    // 도트 네비게이션 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // 배너 호버 시 자동 슬라이드 정지/재시작
    const bannerContainer = document.querySelector('.banner-container');
    if (bannerContainer) {
        bannerContainer.addEventListener('mouseenter', stopAutoSlide);
        bannerContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // 자동 슬라이드 시작
    startAutoSlide();

    // 모바일 메뉴 기능
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('mobile-active');
        });
    }

    // 드롭다운 메뉴 개선 및 페이지 이동 기능 추가
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            // 마우스 진입시 즉시 드롭다운 표시
            item.addEventListener('mouseenter', () => {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateX(-50%) translateY(0)';
            });

            // 마우스 떠날때 드롭다운 숨김
            item.addEventListener('mouseleave', () => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
            });

            // 드롭다운 아이템 클릭 이벤트 (페이지 이동)
            const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(dropItem => {
                dropItem.addEventListener('mouseenter', () => {
                    dropItem.style.backgroundColor = '#339dff';
                    dropItem.style.color = 'white';
                    dropItem.style.transform = 'scale(1.02)';
                });

                dropItem.addEventListener('mouseleave', () => {
                    dropItem.style.backgroundColor = '';
                    dropItem.style.color = '';
                    dropItem.style.transform = 'scale(1)';
                });

                // 클릭 이벤트로 페이지 이동
                dropItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    const categoryText = e.target.textContent.trim();
                    
                    if (categoryPages[categoryText]) {
                        // 실제 페이지로 이동
                        window.location.href = categoryPages[categoryText];
                    } else {
                        // 페이지가 없는 경우 알림
                        alert(`${categoryText} 페이지는 준비 중입니다.`);
                    }
                });
            });
        }
    });

    // 강좌 카드 호버 효과 강화
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
    });

    // CTA 버튼 클릭 이벤트
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'pages/courses.html'; // 강좌 목록 페이지로 이동
        });
    });

    // Detail 버튼 클릭 이벤트
    const detailButtons = document.querySelectorAll('.detail-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseTitle = e.target.closest('.course-card').querySelector('h3').textContent;
            
            if (coursePages[courseTitle]) {
                window.location.href = coursePages[courseTitle];
            } else {
                alert(`${courseTitle} 상세 페이지는 준비 중입니다.`);
            }
        });
    });

    // 액션 버튼 클릭 이벤트
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buttonText = btn.querySelector('span:last-child').textContent;
            switch(buttonText) {
                case '검색':
                    window.location.href = 'pages/search.html';
                    break;
                case '마이페이지':
                    window.location.href = 'pages/mypage.html';
                    break;
                case '로그인':
                    window.location.href = 'pages/login.html';
                    break;
            }
        });
    });

    // 모바일 메뉴 애니메이션
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // 페이지 로드 시 첫 번째 슬라이드 표시
    if (slides.length > 0) {
        showSlide(0);
    }

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });

    // 창 크기 변경 시 반응형 처리
    window.addEventListener('resize', () => {
        // 모바일에서 데스크탑으로 변경시 메뉴 초기화
        if (window.innerWidth > 768) {
            if (mainNav) {
                mainNav.classList.remove('mobile-active');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});
// 인증 시스템 (localStorage 기반)
class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('allteachers_users')) || {};
        this.currentUser = JSON.parse(localStorage.getItem('allteachers_current_user')) || null;
        this.init();
    }

    init() {
        // 기본 사용자 생성 (테스트용)
        if (Object.keys(this.users).length === 0) {
            this.users = {
                'test@example.com': {
                    name: '김테스트',
                    email: 'test@example.com',
                    password: '123456',
                    joinDate: '2025-01-15',
                    courses: ['AI/인공지능', '비즈니스 영어'],
                    progress: {
                        'AI/인공지능': 25,
                        '비즈니스 영어': 60
                    }
                },
                'demo@allteachers.com': {
                    name: '데모사용자',
                    email: 'demo@allteachers.com',
                    password: 'demo123',
                    joinDate: '2025-01-20',
                    courses: ['데이터 분석', 'ChatGPT 활용'],
                    progress: {
                        '데이터 분석': 40,
                        'ChatGPT 활용': 80
                    }
                }
            };
            this.saveUsers();
        }
        this.updateUI();
        this.bindEvents();
    }

    saveUsers() {
        localStorage.setItem('allteachers_users', JSON.stringify(this.users));
    }

    saveCurrentUser() {
        localStorage.setItem('allteachers_current_user', JSON.stringify(this.currentUser));
    }

    updateUI() {
        const authBtn = document.getElementById('auth-btn');
        const authText = document.getElementById('auth-text');
        const mypageBtn = document.getElementById('mypage-btn');

        if (this.currentUser) {
            authText.textContent = '로그아웃';
            authBtn.classList.add('logged-in');
            if (mypageBtn) {
                mypageBtn.style.display = 'flex';
            }
        } else {
            authText.textContent = '로그인';
            authBtn.classList.remove('logged-in');
            if (mypageBtn) {
                mypageBtn.style.display = 'flex';
            }
        }
    }

    bindEvents() {
        // 로그인/로그아웃 버튼
        document.getElementById('auth-btn').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentUser) {
                this.logout();
            } else {
                this.showLoginModal();
            }
        });

        // 마이페이지 버튼
        document.getElementById('mypage-btn').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentUser) {
                window.location.href = 'pages/mypage.html';
            } else {
                alert('로그인이 필요한 서비스입니다.');
                this.showLoginModal();
            }
        });

        // 로그인 폼
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 회원가입 폼
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }

    showLoginModal() {
        document.getElementById('loginModal').style.display = 'block';
        document.getElementById('registerModal').style.display = 'none';
    }

    showRegisterModal() {
        document.getElementById('registerModal').style.display = 'block';
        document.getElementById('loginModal').style.display = 'none';
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (this.users[email] && this.users[email].password === password) {
            this.currentUser = this.users[email];
            this.saveCurrentUser();
            this.updateUI();
            this.closeLoginModal();
            alert(`환영합니다, ${this.currentUser.name}님!`);
        } else {
            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    }

    handleRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (this.users[email]) {
            alert('이미 가입된 이메일입니다.');
            return;
        }

        this.users[email] = {
            name: name,
            email: email,
            password: password,
            joinDate: new Date().toISOString().split('T')[0],
            courses: [],
            progress: {}
        };

        this.saveUsers();
        alert('회원가입이 완료되었습니다. 로그인해주세요.');
        this.showLoginModal();
        this.clearRegisterForm();
    }

    logout() {
        this.currentUser = null;
        this.saveCurrentUser();
        this.updateUI();
        alert('로그아웃되었습니다.');
    }

    closeLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
        this.clearLoginForm();
    }

    closeRegisterModal() {
        document.getElementById('registerModal').style.display = 'none';
        this.clearRegisterForm();
    }

    clearLoginForm() {
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    }

    clearRegisterForm() {
        document.getElementById('register-name').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-password-confirm').value = '';
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    addCourseToUser(courseTitle) {
        if (this.currentUser && !this.currentUser.courses.includes(courseTitle)) {
            this.currentUser.courses.push(courseTitle);
            this.currentUser.progress[courseTitle] = 0;
            this.users[this.currentUser.email] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
    }

    updateProgress(courseTitle, progress) {
        if (this.currentUser) {
            this.currentUser.progress[courseTitle] = progress;
            this.users[this.currentUser.email] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
    }
}

// 전역 함수들
function closeLoginModal() {
    authSystem.closeLoginModal();
}

function closeRegisterModal() {
    authSystem.closeRegisterModal();
}

function showLogin() {
    authSystem.showLoginModal();
}

function showRegister() {
    authSystem.showRegisterModal();
}

function goToCourse(url) {
    window.location.href = url;
}

// 모달 외부 클릭시 닫기
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// 인증 시스템 초기화
const authSystem = new AuthSystem();
// 검색 시스템
class SearchSystem {
    constructor() {
        this.courses = [
            {
                title: 'AI/인공지능 완전정복',
                category: 'AI/인공지능',
                instructor: '김민수',
                description: 'AI의 기본 개념부터 ChatGPT, 미드저니 등 최신 AI 도구 활용법까지',
                url: 'pages/ai-artificial-intelligence.html',
                keywords: ['AI', '인공지능', 'ChatGPT', '미드저니', '머신러닝', '딥러닝']
            },
            {
                title: '실전 영어회화 마스터',
                category: '언어교육',
                instructor: '제니퍼 스미스',
                description: '실제 상황에서 바로 사용할 수 있는 영어회화',
                url: 'pages/english-conversation.html',
                keywords: ['영어', '회화', '영어회화', '비즈니스영어', '스피킹']
            },
            {
                title: '비즈니스 영어',
                category: '언어교육',
                instructor: '제니퍼 스미스',
                description: '글로벌 비즈니스 현장에서 사용하는 실무 영어',
                url: 'pages/business-english.html',
                keywords: ['비즈니스', '영어', '업무', '이메일', '프레젠테이션']
            },
            {
                title: '비즈니스 중국어',
                category: '언어교육',
                instructor: '왕선생',
                description: '중국 비즈니스 현장 맞춤 중국어 회화',
                url: 'pages/business-chinese.html',
                keywords: ['중국어', '비즈니스', '회화', '중국', '무역']
            },
            {
                title: '비즈니스 일본어',
                category: '언어교육',
                instructor: '다나카',
                description: '일본 기업과의 소통을 위한 실무 일본어',
                url: 'pages/business-japanese.html',
                keywords: ['일본어', '비즈니스', '회화', '일본', '케이고']
            },
            {
                title: '데이터 분석 실무',
                category: '직무교육',
                instructor: '박데이터',
                description: 'Excel과 Python을 활용한 데이터 분석',
                url: 'pages/data-science.html',
                keywords: ['데이터', '분석', 'Excel', 'Python', '통계', '시각화']
            },
            {
                title: '디지털 마케팅',
                category: '직무교육',
                instructor: '김마케팅',
                description: '온라인 마케팅 전략과 SNS 활용법',
                url: 'pages/marketing.html',
                keywords: ['마케팅', '디지털', 'SNS', '광고', '소셜미디어']
            },
            {
                title: 'UX/UI 디자인',
                category: '직무교육',
                instructor: '이디자인',
                description: '사용자 중심의 디자인 설계와 구현',
                url: 'pages/design.html',
                keywords: ['UX', 'UI', '디자인', '사용자경험', '인터페이스']
            },
            {
                title: '창업과 리더십',
                category: '대학교육',
                instructor: '박창업',
                description: '미래 리더를 위한 창업 실무 특강',
                url: 'pages/employment-startup.html',
                keywords: ['창업', '리더십', '기업가정신', '경영']
            },
            {
                title: '진로 설계',
                category: '대학교육',
                instructor: '최진로',
                description: '체계적인 진로 계획 수립 특강',
                url: 'pages/career-aptitude.html',
                keywords: ['진로', '적성', '취업', '커리어']
            }
        ];
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 검색 토글 버튼
        const searchToggle = document.getElementById('search-toggle');
        const searchBox = document.getElementById('search-box');
        
        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                if (searchBox.style.display === 'none' || !searchBox.style.display) {
                    searchBox.style.display = 'flex';
                    document.getElementById('search-input').focus();
                } else {
                    searchBox.style.display = 'none';
                }
            });
        }

        // 검색 폼 제출
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }

        // 실시간 검색 (입력할 때마다)
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (e.target.value.length >= 2) {
                    this.showSearchSuggestions(e.target.value);
                } else {
                    this.hideSearchSuggestions();
                }
            });
        }

        // ESC 키로 검색창 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchBox.style.display = 'none';
                this.hideSearchSuggestions();
            }
        });

        // 검색창 외부 클릭시 닫기
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
                searchBox.style.display = 'none';
                this.hideSearchSuggestions();
            }
        });
    }

    performSearch() {
        const query = document.getElementById('search-input').value.trim();
        if (query.length === 0) {
            alert('검색어를 입력해주세요.');
            return;
        }

        // 검색 결과를 localStorage에 저장
        const results = this.searchCourses(query);
        localStorage.setItem('search_results', JSON.stringify({
            query: query,
            results: results,
            timestamp: Date.now()
        }));

        // 검색 결과 페이지로 이동
        window.location.href = 'pages/search.html';
    }

    searchCourses(query) {
        const lowerQuery = query.toLowerCase();
        return this.courses.filter(course => {
            return course.title.toLowerCase().includes(lowerQuery) ||
                   course.category.toLowerCase().includes(lowerQuery) ||
                   course.instructor.toLowerCase().includes(lowerQuery) ||
                   course.description.toLowerCase().includes(lowerQuery) ||
                   course.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery));
        });
    }

    showSearchSuggestions(query) {
        const results = this.searchCourses(query).slice(0, 5); // 상위 5개만
        let suggestionsHTML = '';
        
        if (results.length > 0) {
            suggestionsHTML = '<div class="search-suggestions">';
            results.forEach(course => {
                suggestionsHTML += `
                    <div class="suggestion-item" onclick="window.location.href='${course.url}'">
                        <div class="suggestion-title">${course.title}</div>
                        <div class="suggestion-category">${course.category}</div>
                    </div>
                `;
            });
            suggestionsHTML += '</div>';
        }

        // 기존 제안사항 제거
        this.hideSearchSuggestions();
        
        if (suggestionsHTML) {
            const searchBox = document.getElementById('search-box');
            searchBox.insertAdjacentHTML('afterend', suggestionsHTML);
        }
    }

    hideSearchSuggestions() {
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
            suggestions.remove();
        }
    }
}

// 검색 시스템 초기화
const searchSystem = new SearchSystem();
