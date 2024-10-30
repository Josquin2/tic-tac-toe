<template>
  <div class="friends-block right--block">
    <div class="friends__header">
      <h4>Friends</h4>
    </div>
    <div class="friends__all">
      <div class="one__friend">
        <div class="friend__avatar">
          <img src="" alt="" />
        </div>
        <div class="friend__info">
          <h5>Josquin</h5>
          <span class="friend__status friend--online"></span>
        </div>
      </div>
      <div class="one__friend">
        <div class="friend__avatar">
          <img src="" alt="" />
        </div>
        <div class="friend__info">
          <h5>Testing-long-name</h5>
          <span class="friend__status"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.friends-block {
  padding: 1rem 0.5rem 0rem 0.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1rem;
  .friends__header {
    display: flex;
    justify-content: center;
    position: relative;

    h4 {
      font-size: 1.1rem;
      color: #cfcfcf;
    }
  }
  .friends__header::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #cfcfcf;
    border-radius: 0.1rem;
  }

  .friends__all {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .one__friend {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #575757;
      padding: 0.5rem;
      border-radius: 0.5rem;
      gap: 0.5rem;
      transition: 0.1s;

      .friend__avatar {
        display: flex;
        width: 1.75rem !important;
        height: 1.75rem;
        border-radius: 0.5rem;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .friend__info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 80%;

        h5 {
          margin: 0;
          font-size: 0.8rem;
          color: #b2b2b2;
        }

        .friend__status {
          display: flex;
          width: 0.25rem;
          height: 70%;
          border-radius: 0.5rem;
          background-color: #b2b2b2;
        }

        .friend--online {
          background-color: #6ba163;
        }
      }
    }
    .one__friend:hover {
      background-color: #505050;
      box-shadow: 0 6px 9px -1.5px rgb(0 0 0 / 0.1),
        0 3px 6px -3px rgb(0 0 0 / 0.1);
    }
  }
}
</style>
