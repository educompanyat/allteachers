// 회원가입 시스템
class RegisterSystem {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.registerBtn = document.getElementById('registerBtn');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupValidation();
    }

    bindEvents() {
        // 폼 제출
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // 실시간 유효성 검사
        const inputs = this.form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });

        // 비밀번호 강도 체크
        document.getElementById('password').addEventListener('input', (e) => {
            this.checkPasswordStrength(e.target.value);
        });

        // 비밀번호 확인
        document.getElementById('confirmPassword').addEventListener('input', (e) => {
            this.checkPasswordMatch();
        });

        // 이메일 중복 체크
        document.getElementById('email').addEventListener('blur', (e) => {
            this.checkEmailDuplicate(e.target.value);
        });

        // 이용약관 체크박스 변경시 버튼 활성화
        document.getElementById('terms').addEventListener('change', () => {
            this.updateSubmitButton();
        });
    }

    setupValidation() {
        // 실시간 폼 유효성 검사
        const requiredFields = ['fullName', 'email', 'password', 'confirmPassword'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            field.addEventListener('input', () => {
                this.updateSubmitButton();
            });
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();

        switch (fieldName) {
            case 'fullName':
                return this.validateName(value);
            case 'email':
                return this.validateEmail(value);
            case 'password':
                return this.validatePassword(value);
            case 'confirmPassword':
                return this.validatePasswordConfirm(value);
            case 'phone':
                return this.validatePhone(value);
            default:
                return true;
        }
    }

    validateName(name) {
        if (name.length < 2) {
            this.showError('fullName', '이름은 2자 이상 입력해주세요.');
            return false;
        }
        if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
            this.showError('fullName', '이름은 한글 또는 영문만 입력 가능합니다.');
            return false;
        }
        this.showSuccess('fullName', '사용 가능한 이름입니다.');
        return true;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('email', '올바른 이메일 형식을 입력해주세요.');
            return false;
        }
        return true;
    }

    validatePassword(password) {
        if (password.length < 8) {
            this.showError('password', '비밀번호는 8자 이상 입력해주세요.');
            return false;
        }
        if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            this.showError('password', '비밀번호는 영문과 숫자를 포함해야 합니다.');
            return false;
        }
        this.clearError('password');
        return true;
    }

    validatePasswordConfirm(confirmPassword) {
        const password = document.getElementById('password').value;
        if (confirmPassword !== password) {
            this.showError('confirmPassword', '비밀번호가 일치하지 않습니다.');
            return false;
        }
        this.showSuccess('confirmPassword', '비밀번호가 일치합니다.');
        return true;
    }

    validatePhone(phone) {
        if (phone && !/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(phone.replace(/-/g, ''))) {
            this.showError('phone', '올바른 전화번호 형식을 입력해주세요.');
            return false;
        }
        return true;
    }

    checkPasswordStrength(password) {
        const strengthFill = document.getElementById('strength-fill');
        const strengthText = document.getElementById('strength-text');
        
        let strength = 0;
        let strengthLabel = '';
        let color = '';

        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 25;

        if (strength <= 25) {
            strengthLabel = '매우 약함';
            color = '#e74c3c';
        } else if (strength <= 50) {
            strengthLabel = '약함';
            color = '#f39c12';
        } else if (strength <= 75) {
            strengthLabel = '보통';
            color = '#f1c40f';
        } else if (strength <= 100) {
            strengthLabel = '강함';
            color = '#27ae60';
        } else {
            strengthLabel = '매우 강함';
            color = '#2ecc71';
        }

        strengthFill.style.width = Math.min(strength, 100) + '%';
        strengthFill.style.backgroundColor = color;
        strengthText.textContent = `비밀번호 강도: ${strengthLabel}`;
        strengthText.style.color = color;
    }

    checkPasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (confirmPassword.length > 0) {
            this.validatePasswordConfirm(confirmPassword);
        }
    }

    checkEmailDuplicate(email) {
        if (!this.validateEmail(email)) return;

        const users = JSON.parse(localStorage.getItem('allteachers_users')) || {};
        
        if (users[email]) {
            this.showError('email', '이미 가입된 이메일입니다.');
            return false;
        } else {
            this.showSuccess('email', '사용 가능한 이메일입니다.');
            return true;
        }
    }

    updateSubmitButton() {
        const requiredFields = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            terms: document.getElementById('terms').checked
        };

        const isValid = Object.values(requiredFields).every(value => 
            typeof value === 'boolean' ? value : value.length > 0
        ) && this.validatePassword(requiredFields.password) &&
            this.validatePasswordConfirm(requiredFields.confirmPassword) &&
            this.validateName(requiredFields.fullName) &&
            this.validateEmail(requiredFields.email);

        this.registerBtn.disabled = !isValid;
    }

    async handleRegister() {
        // 폼 데이터 수집
        const formData = new FormData(this.form);
        const userData = {};
        
        // 기본 정보
        userData.fullName = formData.get('fullName').trim();
        userData.email = formData.get('email').trim();
        userData.password = formData.get('password');
        userData.phone = formData.get('phone') || '';
        userData.birthDate = formData.get('birthDate') || '';
        userData.marketing = formData.get('marketing') === 'on';
        
        // 관심 분야
        userData.interests = [];
        const interests = formData.getAll('interests');
        userData.interests = interests;

        // 가입 정보
        userData.joinDate = new Date().toISOString().split('T')[0];
        userData.joinTime = new Date().toISOString();
        userData.courses = [];
        userData.progress = {};
        userData.lastLogin = null;

        // 로딩 시작
        this.showLoading(true);

        try {
            // 최종 유효성 검사
            if (!this.validateAllFields()) {
                throw new Error('입력 정보를 다시 확인해주세요.');
            }

            // 이메일 중복 체크
            if (!this.checkEmailDuplicate(userData.email)) {
                throw new Error('이미 가입된 이메일입니다.');
            }

            // 사용자 데이터 저장
            const users = JSON.parse(localStorage.getItem('allteachers_users')) || {};
            users[userData.email] = userData;
            localStorage.setItem('allteachers_users', JSON.stringify(users));

            // 가입 통계 업데이트
            this.updateRegistrationStats();

            // 성공 메시지
            await this.simulateApiCall(); // API 호출 시뮬레이션
            
            alert(`🎉 회원가입이 완료되었습니다!\n환영합니다, ${userData.fullName}님!`);
            
            // 로그인 페이지로 이동
            window.location.href = 'login.html?registered=true&email=' + encodeURIComponent(userData.email);

        } catch (error) {
            alert('회원가입 중 오류가 발생했습니다: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    validateAllFields() {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        return this.validateName(fullName) &&
               this.validateEmail(email) &&
               this.validatePassword(password) &&
               this.validatePasswordConfirm(confirmPassword) &&
               terms;
    }

    updateRegistrationStats() {
        const stats = JSON.parse(localStorage.getItem('allteachers_stats')) || {
            totalUsers: 0,
            monthlyRegistrations: {},
            interestStats: {}
        };

        stats.totalUsers += 1;
        
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        stats.monthlyRegistrations[currentMonth] = (stats.monthlyRegistrations[currentMonth] || 0) + 1;

        // 관심 분야 통계
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                              .map(cb => cb.value);
        interests.forEach(interest => {
            stats.interestStats[interest] = (stats.interestStats[interest] || 0) + 1;
        });

        localStorage.setItem('allteachers_stats', JSON.stringify(stats));
    }

    async simulateApiCall() {
        // API 호출 시뮬레이션 (실제로는 서버와 통신)
        return new Promise(resolve => {
            setTimeout(resolve, 1500);
        });
    }

    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        const text = document.getElementById('register-text');
        
        if (show) {
            spinner.style.display = 'block';
            text.style.display = 'none';
            this.registerBtn.disabled = true;
        } else {
            spinner.style.display = 'none';
            text.style.display = 'block';
            this.updateSubmitButton();
        }
    }

    showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + '-error');
        const successElement = document.getElementById(fieldName + '-success');
        
        field.classList.remove('success');
        field.classList.add('error');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (successElement) {
            successElement.style.display = 'none';
        }
    }

    showSuccess(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + '-error');
        const successElement = document.getElementById(fieldName + '-success');
        
        field.classList.remove('error');
        field.classList.add('success');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
}

// 소셜 회원가입 (시뮬레이션)
function socialRegister(provider) {
    alert(`${provider === 'google' ? 'Google' : '카카오'} 소셜 로그인 기능은 준비 중입니다.`);
    // 실제로는 OAuth API 연동
}

// 이용약관 보기
function showTerms() {
    alert('이용약관 내용을 표시합니다.\n\n(실제로는 약관 팝업이나 새 페이지로 이동)');
}

// 개인정보처리방침 보기
function showPrivacy() {
    alert('개인정보처리방침 내용을 표시합니다.\n\n(실제로는 약관 팝업이나 새 페이지로 이동)');
}

// 회원가입 시스템 초기화
document.addEventListener('DOMContentLoaded', () => {
    const registerSystem = new RegisterSystem();
});
