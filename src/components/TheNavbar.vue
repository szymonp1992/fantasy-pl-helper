<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">
        <img src="#" alt="FPL Helper App" width="30" height="30" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="teams-stats" class="nav-link">Teams</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Players stats (Fantasy Premier League)
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink to="/goalkeepers-stats" class="dropdown-item"
                  >Goalkeepers</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/defenders-stats" class="dropdown-item"
                  >Defenders</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/midfielders-stats" class="dropdown-item"
                  >Midfielders</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/forwards-stats" class="dropdown-item"
                  >Forwards</RouterLink
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink to="fixture-ticker" class="nav-link"
              >Fixture ticker</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="transfers-helper" class="nav-link"
              >Transfers helper</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
