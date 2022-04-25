varying vec2 vUv;
varying vec3 vPosition;
uniform float reflect;
uniform bool isEntryFinished;
uniform bool isMobile;

float map(float value, float start1, float stop1, float start2, float stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

void main() {
    // vec3 pos = rotation3d(vPosition, 0.5);
    float vPx = vPosition.x / 25.;
    float offset = map(reflect, 0., 1.0, -1.8, 1.8);
    if(isMobile) {
        offset = map(reflect, 0., 1.0, -5., 5.);
    }
    vPx = vPx - offset / 10.;
    float strength = abs(vPx * 70. - 0.5);
    if(isMobile) {
        strength = abs(vPx * 25. - 0.5);
    }

    strength = strength;

    vec3 blackColor = vec3(0.0);
    vec3 pinkColor = vec3(0.996, 0.141, 0.345);
    vec3 whiteColor = vec3(0.87);
    vec3 mixedColor = mix(whiteColor, blackColor * 10., strength);

    gl_FragColor = vec4(blackColor, 1.0);
    if(isEntryFinished) {
        gl_FragColor = vec4(mixedColor, 1.0);
    }
}