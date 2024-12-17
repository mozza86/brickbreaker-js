export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function collision(rect1, rect2) {
    // rect1 et rect2 sont des objets avec x, y, width, height
    return rect1.x + rect1.width > rect2.x &&  // Rectangle 1 est à droite de Rectangle 2
        rect2.x + rect2.width > rect1.x &&  // Rectangle 2 est à droite de Rectangle 1
        rect1.y + rect1.height > rect2.y && // Rectangle 1 est en bas de Rectangle 2
        rect2.y + rect2.height > rect1.y;   // Rectangle 2 est en bas de Rectangle 1
}

export function collisionSide(rect1, rect2) {
    if (!collision(rect1, rect2)) {
        return null; // Pas de collision
    }

    // Calcul des distances entre les bords
    const collisionSides = {
        left: rect2.x + rect2.width - rect1.x,       // Distance du bord gauche de rect1 au bord droit de rect2
        right: rect1.x + rect1.width - rect2.x,     // Distance du bord droit de rect1 au bord gauche de rect2
        top: rect2.y + rect2.height - rect1.y,      // Distance du bord haut de rect1 au bord bas de rect2
        bottom: rect1.y + rect1.height - rect2.y    // Distance du bord bas de rect1 au bord haut de rect2
    };

    // Trouver le côté où l'intersection est minimale
    const minSide = Object.entries(collisionSides).reduce((min, current) => {
        return current[1] < min[1] ? current : min;
    });

    return minSide[0]; // Retourne la clé : "left", "right", "top", "bottom"
}

export function rebondir(ball, direction) {
    if (direction == null) return;

    if (direction === "bottom") ball.directionY = -1
    if (direction === "top") ball.directionY = 1
    if (direction === "right") ball.directionX = -1
    if (direction === "left") ball.directionX = 1
}