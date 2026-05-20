// ========================== CONSTANTS ==========================
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const INITIAL_GOLD = 500;
const INITIAL_LIVES = 20;
const BASE_HEALTH = 100;
const TOWER_RANGE = 50;
const WAVE_DELAY = 2000;

// ========================== ENUMS ==========================
const TowerType = {
    BASIC: 'basic',
    FIRE: 'fire',
    ICE: 'ice',
    LIGHTNING: 'lightning',
    LASER: 'laser',
    CANNON: 'cannon',
    MISSILE: 'missile',
    TESLA: 'tesla',
    PLASMA: 'plasma',
    POISON: 'poison'
};

const EnemyType = {
    GOBLIN: 'goblin',
    ORC: 'orc',
    TROLL: 'troll',
    DRAGON: 'dragon',
    SKELETON: 'skeleton',
    DEMON: 'demon',
    GHOST: 'ghost',
    GOLEM: 'golem',
    SPIDER: 'spider',
    WRAITH: 'wraith',
    BANDIT: 'bandit',
    MUMMY: 'mummy'
};

// ========================== TOWER DEFINITIONS ==========================
const TOWER_DEFINITIONS = {
    [TowerType.BASIC]: {
        name: '🗡️ Sword Tower',
        cost: 100,
        damage: 10,
        fireRate: 1.0,
        range: 40,
        color: 0x8B4513,
        description: 'Classic melee tower',
        level: 1
    },
    [TowerType.FIRE]: {
        name: '🔥 Fire Tower',
        cost: 200,
        damage: 25,
        fireRate: 1.5,
        range: 50,
        color: 0xFF4500,
        description: 'Burns enemies',
        level: 2
    },
    [TowerType.ICE]: {
        name: '❄️ Ice Tower',
        cost: 180,
        damage: 15,
        fireRate: 1.2,
        range: 55,
        color: 0x00BFFF,
        description: 'Slows enemies',
        level: 2
    },
    [TowerType.LIGHTNING]: {
        name: '⚡ Lightning Tower',
        cost: 250,
        damage: 30,
        fireRate: 0.8,
        range: 60,
        color: 0xFFD700,
        description: 'Chains to enemies',
        level: 3
    },
    [TowerType.LASER]: {
        name: '🎯 Laser Tower',
        cost: 300,
        damage: 40,
        fireRate: 2.0,
        range: 70,
        color: 0xFF1493,
        description: 'Precise beam',
        level: 3
    },
    [TowerType.CANNON]: {
        name: '💣 Cannon Tower',
        cost: 220,
        damage: 50,
        fireRate: 0.5,
        range: 45,
        color: 0x2F4F4F,
        description: 'AOE damage',
        level: 2
    },
    [TowerType.MISSILE]: {
        name: '🚀 Missile Tower',
        cost: 350,
        damage: 60,
        fireRate: 0.6,
        range: 80,
        color: 0xFF6347,
        description: 'Seeking missiles',
        level: 4
    },
    [TowerType.TESLA]: {
        name: '⚙️ Tesla Tower',
        cost: 280,
        damage: 35,
        fireRate: 1.3,
        range: 65,
        color: 0x87CEEB,
        description: 'Electric shocks',
        level: 3
    },
    [TowerType.PLASMA]: {
        name: '🌀 Plasma Tower',
        cost: 400,
        damage: 70,
        fireRate: 0.7,
        range: 75,
        color: 0x00FF00,
        description: 'High energy',
        level: 4
    },
    [TowerType.POISON]: {
        name: '☠️ Poison Tower',
        cost: 190,
        damage: 20,
        fireRate: 1.4,
        range: 52,
        color: 0x9932CC,
        description: 'DoT damage',
        level: 2
    }
};

// ========================== ENEMY DEFINITIONS ==========================
const ENEMY_DEFINITIONS = {
    [EnemyType.GOBLIN]: {
        name: 'Goblin',
        health: 20,
        speed: 0.8,
        gold: 25,
        color: 0x228B22,
        size: 0.6
    },
    [EnemyType.ORC]: {
        name: 'Orc',
        health: 40,
        speed: 0.6,
        gold: 50,
        color: 0x32CD32,
        size: 0.8
    },
    [EnemyType.TROLL]: {
        name: 'Troll',
        health: 80,
        speed: 0.4,
        gold: 100,
        color: 0x3CB371,
        size: 1.2
    },
    [EnemyType.DRAGON]: {
        name: 'Dragon',
        health: 150,
        speed: 0.5,
        gold: 200,
        color: 0xFF8C00,
        size: 1.5
    },
    [EnemyType.SKELETON]: {
        name: 'Skeleton',
        health: 30,
        speed: 0.7,
        gold: 35,
        color: 0xD3D3D3,
        size: 0.7
    },
    [EnemyType.DEMON]: {
        name: 'Demon',
        health: 90,
        speed: 0.65,
        gold: 120,
        color: 0xFF4500,
        size: 0.95
    },
    [EnemyType.GHOST]: {
        name: 'Ghost',
        health: 25,
        speed: 1.0,
        gold: 40,
        color: 0xE6E6FA,
        size: 0.5
    },
    [EnemyType.GOLEM]: {
        name: 'Golem',
        health: 120,
        speed: 0.3,
        gold: 150,
        color: 0x696969,
        size: 1.3
    },
    [EnemyType.SPIDER]: {
        name: 'Spider',
        health: 35,
        speed: 0.85,
        gold: 45,
        color: 0x8B0000,
        size: 0.65
    },
    [EnemyType.WRAITH]: {
        name: 'Wraith',
        health: 50,
        speed: 0.9,
        gold: 75,
        color: 0x4B0082,
        size: 0.7
    },
    [EnemyType.BANDIT]: {
        name: 'Bandit',
        health: 35,
        speed: 0.95,
        gold: 55,
        color: 0x8B4513,
        size: 0.65
    },
    [EnemyType.MUMMY]: {
        name: 'Mummy',
        health: 70,
        speed: 0.5,
        gold: 85,
        color: 0xF5DEB3,
        size: 0.8
    }
};

// ========================== MAIN GAME CLASS ==========================
class TowerDefenseGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.initThree();
        this.initGame();
        this.setupEventListeners();
        this.animate();
    }

    // ========================== INITIALIZATION ==========================
    initThree() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 200, 500);

        this.camera = new THREE.PerspectiveCamera(
            75,
            CANVAS_WIDTH / CANVAS_HEIGHT,
            0.1,
            1000
        );
        this.camera.position.set(0, 60, 60);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        this.canvas.parentElement.replaceChild(this.renderer.domElement, this.canvas);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 80, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.far = 200;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        this.scene.add(directionalLight);

        // Point lights for ambiance
        const pointLight1 = new THREE.PointLight(0x667eea, 0.5);
        pointLight1.position.set(-50, 30, -50);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x764ba2, 0.5);
        pointLight2.position.set(50, 30, 50);
        this.scene.add(pointLight2);

        this.createEnvironment();
    }

    createEnvironment() {
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a4e,
            roughness: 0.8,
            metalness: 0.1
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grid
        const gridHelper = new THREE.GridHelper(200, 20, 0x444466, 0x333344);
        gridHelper.position.y = 0.1;
        this.scene.add(gridHelper);

        // Sky
        const skyGeometry = new THREE.SphereGeometry(300, 32, 32);
        const skyMaterial = new THREE.MeshBasicMaterial({
            color: 0x0a0e27,
            side: THREE.BackSide
        });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(sky);

        // Base (castle)
        this.createBase();
    }

    createBase() {
        const baseGroup = new THREE.Group();

        // Main tower
        const mainGeometry = new THREE.BoxGeometry(20, 40, 20);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.7,
            metalness: 0
        });
        const mainTower = new THREE.Mesh(mainGeometry, stoneMaterial);
        mainTower.position.y = 20;
        mainTower.castShadow = true;
        mainTower.receiveShadow = true;
        baseGroup.add(mainTower);

        // Spire
        const spireGeometry = new THREE.ConeGeometry(8, 20, 8);
        const metalMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            roughness: 0.3,
            metalness: 0.8
        });
        const spire = new THREE.Mesh(spireGeometry, metalMaterial);
        spire.position.set(0, 50, 0);
        spire.castShadow = true;
        baseGroup.add(spire);

        // Walls
        for (let i = 0; i < 4; i++) {
            const wallGeometry = new THREE.BoxGeometry(6, 15, 30);
            const wall = new THREE.Mesh(wallGeometry, stoneMaterial);
            const angle = (i / 4) * Math.PI * 2;
            wall.position.x = Math.cos(angle) * 25;
            wall.position.z = Math.sin(angle) * 25;
            wall.position.y = 7.5;
            wall.castShadow = true;
            wall.receiveShadow = true;
            baseGroup.add(wall);
        }

        baseGroup.position.set(-80, 0, -80);
        this.scene.add(baseGroup);
        this.base = baseGroup;
    }

    initGame() {
        this.gameState = {
            gold: INITIAL_GOLD,
            lives: INITIAL_LIVES,
            score: 0,
            waveNumber: 1,
            gameOver: false,
            gamePaused: false,
            speed: 1,
            baseHealth: BASE_HEALTH,
            selectedTowerType: TowerType.BASIC
        };

        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
        this.messages = [];

        this.path = this.generatePath();
        this.createPathVisuals();

        this.waveActive = false;
        this.waveTimer = 0;
        this.enemySpawnQueue = [];

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.updateUI();
        this.createTowerButtons();
    }

    generatePath() {
        const path = [];
        const points = [
            { x: -90, z: -90 },
            { x: -30, z: -80 },
            { x: 20, z: -70 },
            { x: 50, z: -30 },
            { x: 40, z: 30 },
            { x: 0, z: 50 },
            { x: -40, z: 40 },
            { x: -60, z: 0 },
            { x: -90, z: 0 },
            { x: -90, z: 90 }
        ];

        const curve = new THREE.CatmullRomCurve3(
            points.map(p => new THREE.Vector3(p.x, 1, p.z))
        );

        for (let i = 0; i <= 1; i += 0.001) {
            const point = curve.getPoint(i);
            path.push({ x: point.x, z: point.z, t: i });
        }

        return path;
    }

    createPathVisuals() {
        const geometry = new THREE.BufferGeometry();
        const points = [];

        for (let i = 0; i < this.path.length; i++) {
            const p = this.path[i];
            points.push(p.x, 1.1, p.z);
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));

        const material = new THREE.LineBasicMaterial({
            color: 0x00ff88,
            linewidth: 2,
            fog: false
        });

        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
    }

    createTowerButtons() {
        const container = document.getElementById('tower-buttons-container');
        container.innerHTML = '';

        Object.entries(TOWER_DEFINITIONS).forEach(([type, def]) => {
            const button = document.createElement('button');
            button.className = 'tower-button';
            if (type === TowerType.BASIC) button.classList.add('selected');

            button.innerHTML = `
                <div class="name">${def.name}</div>
                <div class="cost">Cost: 💰${def.cost}</div>
            `;

            button.addEventListener('click', () => {
                this.selectTower(type, button);
            });

            button.addEventListener('mouseenter', (e) => {
                this.showTowerTooltip(e, def);
            });

            button.addEventListener('mouseleave', () => {
                this.hideTowerTooltip();
            });

            container.appendChild(button);
        });
    }

    selectTower(type, buttonElement) {
        document.querySelectorAll('.tower-button').forEach(btn => btn.classList.remove('selected'));
        buttonElement.classList.add('selected');
        this.gameState.selectedTowerType = type;
        this.addMessage(`Selected: ${TOWER_DEFINITIONS[type].name}`);
    }

    showTowerTooltip(event, def) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.display = 'block';
        tooltip.innerHTML = `
            <strong>${def.name}</strong><br>
            Damage: ${def.damage}<br>
            Fire Rate: ${def.fireRate}<br>
            Range: ${def.range}
        `;
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.style.top = (event.pageY + 10) + 'px';
        document.body.appendChild(tooltip);
        event.target._tooltip = tooltip;
    }

    hideTowerTooltip() {
        if (event.target._tooltip) {
            event.target._tooltip.remove();
            event.target._tooltip = null;
        }
    }

    setupEventListeners() {
        // Tower placement
        document.addEventListener('click', (e) => this.handleClick(e));

        // Speed button
        document.getElementById('speed-btn').addEventListener('click', () => {
            this.gameState.speed = this.gameState.speed === 1 ? 2 : 1;
            document.getElementById('speed-btn').textContent = `Speed: ${this.gameState.speed}x`;
        });

        // Start wave button
        document.getElementById('start-wave-btn').addEventListener('click', () => {
            if (!this.waveActive) this.startWave();
        });

        // Window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Tower info on hover
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    handleClick(event) {
        if (event.target.closest('.ui-panel') || event.target.closest('button')) return;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.scene, true);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            this.placeTower(point.x, point.z);
        }
    }

    placeTower(x, z) {
        const towerType = this.gameState.selectedTowerType;
        const def = TOWER_DEFINITIONS[towerType];

        if (this.gameState.gold < def.cost) {
            this.addMessage('❌ Not enough gold!');
            return;
        }

        // Check if too close to other towers
        for (let tower of this.towers) {
            const dist = Math.hypot(tower.x - x, tower.z - z);
            if (dist < 15) {
                this.addMessage('❌ Too close to another tower!');
                return;
            }
        }

        // Check if too close to base
        const distToBase = Math.hypot(x + 80, z + 80);
        if (distToBase < 30) {
            this.addMessage('❌ Too close to base!');
            return;
        }

        // Create tower
        const tower = new Tower(towerType, x, z, def);
        this.towers.push(tower);
        this.scene.add(tower.mesh);

        this.gameState.gold -= def.cost;
        this.gameState.score += def.cost / 2;

        this.addMessage(`✅ ${def.name} placed!`);
        this.updateUI();
    }

    startWave() {
        if (this.waveActive) return;

        this.waveActive = true;
        this.waveTimer = 0;
        this.enemySpawnQueue = this.generateWave(this.gameState.waveNumber);

        this.addMessage(`🌊 Wave ${this.gameState.waveNumber} started!`);
        this.updateUI();
    }

    generateWave(waveNumber) {
        const enemies = [];
        const baseCount = 3 + waveNumber * 2;
        const types = Object.keys(EnemyType);

        for (let i = 0; i < baseCount; i++) {
            const type = types[i % types.length];
            const spawnDelay = i * 300;
            enemies.push({ type, spawnDelay, spawnTime: 0 });
        }

        // Add stronger enemies in later waves
        if (waveNumber > 3) {
            for (let i = 0; i < Math.min(waveNumber - 3, 5); i++) {
                const type = EnemyType.DRAGON;
                const spawnDelay = (baseCount + i) * 400;
                enemies.push({ type, spawnDelay, spawnTime: 0 });
            }
        }

        return enemies;
    }

    updateGame(deltaTime) {
        if (this.gameState.gameOver) return;

        const dt = deltaTime * this.gameState.speed;

        // Update wave
        this.updateWave(dt);

        // Update towers
        this.towers.forEach(tower => {
            tower.update(dt, this.enemies);
            tower.shoot(this.enemies, this.projectiles, this.scene);
        });

        // Update enemies
        this.enemies = this.enemies.filter(enemy => {
            enemy.update(dt, this.path);
            
            if (enemy.isAlive()) {
                return true;
            } else {
                this.scene.remove(enemy.mesh);
                if (enemy.isReachedEnd) {
                    this.gameState.baseHealth -= 1;
                } else {
                    this.gameState.gold += ENEMY_DEFINITIONS[enemy.type].gold;
                    this.gameState.score += ENEMY_DEFINITIONS[enemy.type].gold;
                }
                return false;
            }
        });

        // Update projectiles
        this.projectiles = this.projectiles.filter(proj => {
            proj.update(dt);
            
            // Check collision with enemies
            if (proj.hitTarget) {
                for (let enemy of this.enemies) {
                    const dist = Math.hypot(enemy.x - proj.x, enemy.z - proj.z);
                    if (dist < 5) {
                        enemy.takeDamage(proj.damage);
                        proj.hitTarget = false;
                        break;
                    }
                }
            }
            
            return proj.isAlive();
        });

        // Remove dead projectiles from scene
        this.projectiles.forEach(proj => {
            if (!proj.isAlive() && proj.mesh.parent) {
                this.scene.remove(proj.mesh);
            }
        });

        // Check game over conditions
        if (this.gameState.baseHealth <= 0) {
            this.endGame();
        }

        this.updateUI();
    }

    updateWave(dt) {
        if (!this.waveActive) return;

        this.waveTimer += dt;

        // Spawn enemies
        this.enemySpawnQueue = this.enemySpawnQueue.filter(item => {
            item.spawnTime += dt;

            if (item.spawnTime >= item.spawnDelay) {
                const enemy = new Enemy(item.type, this.path[0].x, this.path[0].z);
                this.enemies.push(enemy);
                this.scene.add(enemy.mesh);
                return false;
            }
            return true;
        });

        // Check if wave is complete
        if (this.enemySpawnQueue.length === 0 && this.enemies.length === 0) {
            this.waveActive = false;
            this.gameState.waveNumber++;
            this.gameState.gold += 100 * this.gameState.waveNumber;
            this.addMessage(`✅ Wave ${this.gameState.waveNumber - 1} completed!`);
        }
    }

    endGame() {
        this.gameState.gameOver = true;
        document.getElementById('game-over-screen').style.display = 'flex';
        document.getElementById('final-wave').textContent = this.gameState.waveNumber;
        document.getElementById('final-score-value').textContent = this.gameState.score;
    }

    updateUI() {
        document.getElementById('gold-display').textContent = this.gameState.gold;
        document.getElementById('lives-display').textContent = this.gameState.lives;
        document.getElementById('score-display').textContent = this.gameState.score;
        document.getElementById('wave-display').textContent = this.gameState.waveNumber;
        document.getElementById('enemies-display').textContent = this.enemies.length;
        document.getElementById('towers-display').textContent = this.towers.length;
        document.getElementById('health-display').textContent = Math.max(0, this.gameState.baseHealth);

        const healthPercent = Math.max(0, this.gameState.baseHealth) / BASE_HEALTH * 100;
        document.getElementById('health-bar-fill').style.width = healthPercent + '%';

        const startBtn = document.getElementById('start-wave-btn');
        startBtn.disabled = this.waveActive;
        startBtn.style.opacity = this.waveActive ? 0.5 : 1;
    }

    addMessage(text) {
        this.messages.push({ text, time: 5 });

        const log = document.getElementById('message-log');
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        messageEl.textContent = text;
        log.insertBefore(messageEl, log.firstChild);

        if (log.children.length > 10) {
            log.removeChild(log.lastChild);
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const now = Date.now();
        const deltaTime = (now - (this.lastFrameTime || now)) / 1000;
        this.lastFrameTime = now;

        this.updateGame(deltaTime);
        this.renderer.render(this.scene, this.camera);
    }
}

// ========================== TOWER CLASS ==========================
class Tower {
    constructor(type, x, z, definition) {
        this.type = type;
        this.x = x;
        this.z = z;
        this.def = definition;

        this.health = 100;
        this.shootCooldown = 0;
        this.level = 1;

        this.createMesh();
    }

    createMesh() {
        const group = new THREE.Group();
        group.position.set(this.x, 0, this.z);

        // Base
        const baseGeometry = new THREE.CylinderGeometry(8, 10, 2, 32);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.8
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.receiveShadow = true;
        base.castShadow = true;
        group.add(base);

        // Tower body
        const bodyGeometry = new THREE.CylinderGeometry(6, 6, 15, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: this.def.color,
            roughness: 0.6,
            metalness: 0.4
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 8;
        body.receiveShadow = true;
        body.castShadow = true;
        group.add(body);

        // Top ornament
        const topGeometry = new THREE.ConeGeometry(4, 8, 32);
        const topMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            roughness: 0.3,
            metalness: 0.8
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 20;
        top.castShadow = true;
        group.add(top);

        // Range indicator (semi-transparent)
        const rangeGeometry = new THREE.CylinderGeometry(this.def.range, this.def.range, 0.1, 64);
        const rangeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.15
        });
        const range = new THREE.Mesh(rangeGeometry, rangeMaterial);
        range.position.y = 0.2;
        group.add(range);

        group.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        this.mesh = group;
    }

    update(dt, enemies) {
        this.shootCooldown -= dt;
    }

    shoot(enemies, projectiles, scene) {
        if (this.shootCooldown > 0) return;

        // Find target
        let target = null;
        let minDist = this.def.range;

        for (let enemy of enemies) {
            const dist = Math.hypot(enemy.x - this.x, enemy.z - this.z);
            if (dist < minDist) {
                minDist = dist;
                target = enemy;
            }
        }

        if (!target) return;

        // Shoot
        const projectile = new Projectile(
            this.x, 10, this.z,
            target.x, 10, target.z,
            this.def.damage,
            this.type
        );
        projectiles.push(projectile);
        scene.add(projectile.mesh);

        this.shootCooldown = 1 / this.def.fireRate;
    }
}

// ========================== ENEMY CLASS ==========================
class Enemy {
    constructor(type, x, z) {
        this.type = type;
        this.x = x;
        this.z = z;
        this.def = ENEMY_DEFINITIONS[type];

        this.health = this.def.health;
        this.maxHealth = this.def.health;
        this.pathIndex = 0;
        this.isReachedEnd = false;

        this.createMesh();
    }

    createMesh() {
        const geometry = new THREE.IcosahedronGeometry(this.def.size, 4);
        const material = new THREE.MeshStandardMaterial({
            color: this.def.color,
            roughness: 0.4,
            metalness: 0.2,
            emissive: this.def.color,
            emissiveIntensity: 0.3
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.x, this.def.size + 1, this.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Health bar
        const barGeometry = new THREE.PlaneGeometry(this.def.size * 2, 0.5);
        const barMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.7
        });
        const healthBar = new THREE.Mesh(barGeometry, barMaterial);
        healthBar.position.y = this.def.size + 3;
        mesh.add(healthBar);
        mesh.healthBar = healthBar;

        this.mesh = mesh;
    }

    update(dt, path) {
        const moveDistance = this.def.speed * dt * 30;
        const startIdx = this.pathIndex;

        for (let i = 0; i < 1000; i++) {
            const currentNode = path[this.pathIndex];
            const nextIdx = Math.min(this.pathIndex + 1, path.length - 1);
            const nextNode = path[nextIdx];

            const dx = nextNode.x - currentNode.x;
            const dz = nextNode.z - currentNode.z;
            const dist = Math.hypot(dx, dz);

            if (dist < moveDistance) {
                this.x = nextNode.x;
                this.z = nextNode.z;
                this.pathIndex = nextIdx;
                if (this.pathIndex >= path.length - 1) {
                    this.isReachedEnd = true;
                    break;
                }
            } else {
                this.x += (dx / dist) * moveDistance;
                this.z += (dz / dist) * moveDistance;
                break;
            }
        }

        this.mesh.position.set(this.x, this.def.size + 1, this.z);

        // Update health bar
        const healthPercent = Math.max(0, this.health) / this.maxHealth;
        const barMaterial = this.mesh.healthBar.material;

        if (healthPercent > 0.5) {
            barMaterial.color.setHex(0x00ff88);
        } else if (healthPercent > 0.25) {
            barMaterial.color.setHex(0xffff00);
        } else {
            barMaterial.color.setHex(0xff0000);
        }

        const scale = healthPercent;
        this.mesh.healthBar.scale.x = scale;

        // Rotation
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
    }

    takeDamage(amount) {
        this.health -= amount;
    }

    isAlive() {
        return this.health > 0 && !this.isReachedEnd;
    }
}

// ========================== PROJECTILE CLASS ==========================
class Projectile {
    constructor(x, y, z, targetX, targetY, targetZ, damage, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.targetX = targetX;
        this.targetY = targetY;
        this.targetZ = targetZ;
        this.damage = damage;
        this.type = type;
        this.travelTime = 0.5;
        this.elapsedTime = 0;
        this.hitTarget = false;

        this.createMesh();
    }

    createMesh() {
        let geometry, material;

        if (this.type === TowerType.LASER) {
            geometry = new THREE.TubeGeometry(
                new THREE.LineCurve3(
                    new THREE.Vector3(this.x, this.y, this.z),
                    new THREE.Vector3(this.targetX, this.targetY, this.targetZ)
                ),
                1, 0.3, 8
            );
            material = new THREE.MeshBasicMaterial({
                color: 0xFF1493,
                emissive: 0xFF1493,
                emissiveIntensity: 1
            });
        } else if (this.type === TowerType.FIRE) {
            geometry = new THREE.SphereGeometry(0.8, 8, 8);
            material = new THREE.MeshBasicMaterial({
                color: 0xFF4500,
                emissive: 0xFF4500,
                emissiveIntensity: 0.8
            });
        } else if (this.type === TowerType.ICE) {
            geometry = new THREE.IcosahedronGeometry(0.7, 3);
            material = new THREE.MeshBasicMaterial({
                color: 0x00BFFF,
                emissive: 0x00BFFF,
                emissiveIntensity: 0.6
            });
        } else if (this.type === TowerType.MISSILE) {
            geometry = new THREE.ConeGeometry(0.5, 2, 8);
            material = new THREE.MeshStandardMaterial({
                color: 0xFF6347,
                emissive: 0xFF6347,
                emissiveIntensity: 0.5
            });
        } else {
            geometry = new THREE.SphereGeometry(0.5, 8, 8);
            material = new THREE.MeshBasicMaterial({
                color: 0xFFD700,
                emissive: 0xFFD700,
                emissiveIntensity: 0.7
            });
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(this.x, this.y, this.z);
        mesh.castShadow = true;

        this.mesh = mesh;
    }

    update(dt) {
        this.elapsedTime += dt;
        const progress = Math.min(this.elapsedTime / this.travelTime, 1);

        // Lerp position
        this.x += (this.targetX - this.x) * progress * 0.1;
        this.y += (this.targetY - this.y) * progress * 0.1;
        this.z += (this.targetZ - this.z) * progress * 0.1;

        this.mesh.position.set(this.x, this.y, this.z);

        // Rotation
        this.mesh.rotation.x += 0.1;
        this.mesh.rotation.y += 0.15;

        if (progress >= 1 && !this.hitTarget) {
            this.hitTarget = true;
        }
    }

    isAlive() {
        return this.elapsedTime < this.travelTime * 1.2;
    }
}

// ========================== INITIALIZATION ==========================
const game = new TowerDefenseGame();