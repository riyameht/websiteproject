document.addEventListener('DOMContentLoaded', () => {
    const mall = document.querySelector('.mall');
    const elevatorDoors = document.querySelectorAll('.elevator-door');
    const peopleContainer = document.querySelector('.people-container');
    let rotationY = 0;
    let scale = 1;

    // Rotation controls
    document.getElementById('rotateLeft').addEventListener('click', () => {
        rotationY -= 15;
        updateMallTransform();
    });

    document.getElementById('rotateRight').addEventListener('click', () => {
        rotationY += 15;
        updateMallTransform();
    });

    // Zoom controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        scale += 0.1;
        updateMallTransform();
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        scale -= 0.1;
        updateMallTransform();
    });

    function updateMallTransform() {
        mall.style.transform = `translate(-50%, -50%) rotateX(-20deg) rotateY(${rotationY}deg) scale(${scale})`;
    }

    // Elevator animation
    setInterval(() => {
        elevatorDoors.forEach(door => {
            door.classList.toggle('open');
        });
    }, 5000);

    // People animation
    function createPerson() {
        const person = document.createElement('div');
        person.className = 'person';
        person.style.left = `${Math.random() * 760}px`;
        peopleContainer.appendChild(person);

        let targetX = Math.random() * 760;
        let targetY = Math.random() * 560;

        function movePerson() {
            const x = parseFloat(person.style.left);
            const y = parseFloat(person.style.bottom) || 0;

            if (Math.abs(x - targetX) > 5 || Math.abs(y - targetY) > 5) {
                person.style.left = `${x + Math.sign(targetX - x) * 2}px`;
                person.style.bottom = `${y + Math.sign(targetY - y) * 2}px`;
                requestAnimationFrame(movePerson);
            } else {
                targetX = Math.random() * 760;
                targetY = Math.random() * 560;
                setTimeout(movePerson, Math.random() * 2000 + 1000);
            }
        }

        movePerson();
    }

    for (let i = 0; i < 20; i++) {
        createPerson();
    }

    // Shop hover effect
    const shops = document.querySelectorAll('.shop');
    shops.forEach(shop => {
        shop.addEventListener('mouseover', () => {
            shop.style.transform = 'scale(1.1) translateZ(20px)';
        });
        shop.addEventListener('mouseout', () => {
            shop.style.transform = 'scale(1) translateZ(0)';
        });
    });
});