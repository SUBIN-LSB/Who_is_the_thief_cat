document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const mainSection = document.querySelector('#main');
    const startButton = mainSection.querySelector('li:nth-child(1)');
    const continueButton = mainSection.querySelector('li:nth-child(2)');
    let savedGameState = null;

    // 초기화 함수
    const initialize = () => {
        // Local Storage에서 저장된 게임 상태 불러오기
        savedGameState = localStorage.getItem('savedGameState');

        if (savedGameState && document.getElementById(savedGameState)) {
            showSection(savedGameState);
        } else {
            showSection('main'); // 기본적으로 main 섹션을 보여줌
        }
    };

    const showSection = (id) => {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(`#${id}`).classList.add('active');
    };

    startButton.addEventListener('click', () => {
        savedGameState = null;  // 새로운 게임 시작
        showSection('map_1');
    });

    // #map_1 섹션의 .back 버튼 클릭 이벤트
    document.querySelector('#map_1 .back').addEventListener('click', () => {
        if (savedGameState) {
            saveGameState(savedGameState); // 현재 상태 저장
            showSection('main');
        }
    });

    // #map_3 섹션의 .back 버튼 클릭 이벤트
    document.querySelector('#map_3 .back').addEventListener('click', () => {
        if (savedGameState) {
            saveGameState(savedGameState); // 현재 상태 저장
            showSection('main');
        }
    });

    // #map_4 섹션의 .back 버튼 클릭 이벤트
    document.querySelector('#map_4 .back').addEventListener('click', () => {
        if (savedGameState) {
            saveGameState(savedGameState); // 현재 상태 저장
            showSection('main');
        }
    });

    continueButton.addEventListener('click', () => {
        if (savedGameState) {
            showSection(savedGameState);
        } else {
            alert('저장된 게임이 없습니다.');
        }
    });

    // 각 버튼별로 특정 맵으로 이동하도록 이벤트 추가
    document.querySelectorAll('.move_top').forEach(button => {
        button.addEventListener('click', () => {
            saveAndShowNextSection('map_2');
        });
    });

    document.querySelectorAll('.move_left').forEach(button => {
        button.addEventListener('click', () => {
            const currentId = button.closest('.section').id;
            if (currentId === 'map_1') {
                saveAndShowNextSection('map_3');
            } else if (currentId === 'map_3') {
                saveAndShowNextSection('map_4');
            } else if (currentId === 'map_4') {
                saveAndShowNextSection('map_1');
            }
        });
    });

    document.querySelectorAll('.move_right').forEach(button => {
        button.addEventListener('click', () => {
            const currentId = button.closest('.section').id;
            if (currentId === 'map_1') {
                saveAndShowNextSection('map_4');
            } else if (currentId === 'map_4') {
                saveAndShowNextSection('map_3');
            } else if (currentId === 'map_3') {
                saveAndShowNextSection('map_1');
            }
        });
    });

    document.querySelectorAll('.move_down').forEach(button => {
        button.addEventListener('click', () => {
            const currentId = button.closest('.section').id;
            if (currentId === 'map_2') {
                saveAndShowNextSection('map_1');
            } else if (currentId === 'map_5') {
                saveAndShowNextSection('map_4');
            }
        });
    });

    document.querySelector('.move').addEventListener('click', () => {
        saveAndShowNextSection('map_5');
    });
    
    // 정답의 그만하기 버튼을 클릭했을 때의 동작
    document.getElementById('quit1').addEventListener('click', function() {
        location.reload();
        saveAndShowNextSection('main'); // main 섹션으로 이동
    });
    
    // 오답의 그만하기 버튼을 클릭했을 때의 동작
    document.getElementById('quit2').addEventListener('click', function() {
        location.reload();
        saveAndShowNextSection('main'); // main 섹션으로 이동
    });
    // 저장과 섹션 이동을 처리하는 함수
    const saveAndShowNextSection = (nextSectionId) => {
        saveGameState(nextSectionId);
        showSection(nextSectionId);
    };

    // 저장된 상태를 기록하는 함수
    const saveGameState = (currentMapId) => {
        savedGameState = currentMapId;
        localStorage.setItem('savedGameState', savedGameState); // Local Storage에 저장
    };

    // 페이지 로드 시 초기화
    initialize();

});

