<script>
</script>

<template lang="pug">
- var orbitCount = 3;

#space
  .space_field_wrapper
    .space_field.mother
      .planet
  
  - for (var i = 0; i < orbitCount; i++)
    .space_field_wrapper
      .space_field.satellite
        .planet
</template>

<style lang="scss" scoped>
$orbitCount: 3;

body {
  background: #eef;
  height: 100vh;
  overflow: hidden;
}
#space {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 700px;
  
  .space_field {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    
    .planet {
      position: absolute;
      top: 50%;
      left: 50%;
      overflow: hidden;
      border-radius: 100%;
      box-sizing: border-box;
      border: 12px solid #000;
    }
    &.mother .planet {
      width: 200px;
      height: 200px;
      background: rgba(255, 80, 50, 1);
      transform: translate(-50%, -50%);

      &::before {
        content: '';
        position: absolute;
        top: -12%;
        left: -12%;
        width: 100%;
        height: 100%;
        background: rgba(100, 40, 0, 1);
        border-radius: 100%;
        mix-blend-mode: screen;
      }
    }
    &.satellite .planet {
      left: 100%;
      width: 50px;
      height: 50px;
      background: rgba(50, 80, 255, 1);
      transform: translate(-50%, -50%);

      &::before {
        content: '';
        position: absolute;
        top: -15%;
        left: -15%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 100%;
      }
    }
  }
  .space_field_wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    
    @for $i from 1 through $orbitCount + 1 {
      &:nth-child(#{$i}) {
        transform: rotateZ(#{($i - 1) * -20}deg);
        
        .space_field.satellite {
          animation: orbit 2000ms + 400 * $i linear infinite;

          .planet {
            // left: 100% + ($i - 1) * 0;
            animation: planet 2000ms + 400 * $i linear infinite;
            background: rgba(random(255), random(255), random(255), 1);
          }
        }
      }
    }
  }
}

@keyframes orbit {
  0% {
    transform: translate(-50%, -50%) rotateY(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateY(360deg);
  }
}

@keyframes planet {
  0% {
    transform: translate(-50%, -50%) rotateY(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateY(-360deg);
  }
}
</style>