varying vec2 vUv;
varying vec3 vPosition;
uniform bool isMobile;
uniform bool isEntryFinished;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    float delta = 0.3;
    if (isMobile) {
        delta = -1.3;
    }
    vUv = uv;
    float new_x = gl_Position.x * cos(delta) - gl_Position.y * sin(delta);
    vPosition = position;
    vPosition.x = new_x;

}