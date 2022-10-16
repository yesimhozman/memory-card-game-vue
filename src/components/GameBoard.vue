<script>
import CardView from "./CardView.vue";

export default {
  components: {
    CardView,
  },
};
</script>
<template>
  <div class="game-board">
    <p>I am the GameBoard.vue component</p>
    <ul class="cards">
      <li class="card">
        <CardView viewType="front" />
        <CardView
          viewType="back"
          imageUrl="../static_site/images/img-1.png"
          imageAltText="An emerald cut into a diamond shape."
        />
      </li>
    </ul>
  </div>
</template>
