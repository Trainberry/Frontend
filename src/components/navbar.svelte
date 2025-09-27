<script>
  import { emergencyStop } from "$lib/store";
</script>

<nav class="navbar navbar-expand bg-secondary fixed-top" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Trainberry</a>
    <ul class="navbar-nav me-auto">
      <li class="nav-item">
        <a class="nav-link" href="/">Accueil</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/about">A propos</a>
      </li>
    </ul>
    <button class="btn btn-danger my-2 my-sm-0" onclick={emergencyStop}
      >ARRÊT D'URGENCE</button
    >
  </div>
</nav>
