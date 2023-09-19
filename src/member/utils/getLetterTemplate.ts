export const getVerificationLetterTemplate = ({
  token,
  ticket,
}: {
  token: string;
  ticket: boolean;
}) => {
  return `
  <!DOCTYPE html>
<html>
  <head>
    <style>
      /* Your CSS styles here */
      body {
        font-family: 'Poppins', sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 1200px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: fit-content;
        padding-bottom: 20px;
      }
      h1 {
        color: #333;
      }
      .intro-image {
        width: 100%;
        height: auto;
        max-height: 350px;
        object-position: bottom;
        object-fit: cover;
      }
      h3 {
        margin: 0;
        padding: 0;
      }
      .title-container {
        padding: 10px;
        background-color: #ff0000;
        font-size: 20px;
        font-weight: 600;
        color: white;
        transform: translateY(-10px);
        margin-bottom: 20px;
      }
      h4 {
        font-weight: 600;
        font-size: 18px;
        margin: 0;
        padding: 0;
      }
      a {
        color: black;
      }
      .right {
        text-align: right;
        margin-right: 10px;
      }
      .container {
        margin-bottom: 10px;
      }
      .center {
        text-align: center;
        margin-bottom: 10px;
      }
      .btn-wrapper {
        background-color: #42e334;
        max-width: 200px;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 0 auto;
        margin-bottom: 10px;
      }
      .btn {
        color: white !important;
        font-weight: 600;
        text-decoration: underline;
        font-size: 20px;
      }
      .wrapper {
        margin: 20px;
      }

      .btn-wrapper.green {
        background-color: #42e334;
        color: white !important;
      }

      .btn-wrapper.yellow {
        background-color: #fcef3c;
        color: black !important;
      }
      .btn-wrapper.yellow .btn {
        color: black !important;
      }
      .mb-4 {
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <img
        class="intro-image"
        src="https://storage.googleapis.com/abe_cloud_storage/image/large/c8d8300c-08d6-4110-b9a9-afe2dce5257a.jpg"
        alt="image"
      />
      <div class="title-container">
        <h3>You are about to join Ace Battle Mile!</h3>
      </div>
      <div class="wrapper">
        <h4>You can confirm your email address by following the link below.</h4>
      </div>
      <div class="wrapper mb-4">
        <div class="btn-wrapper green">
          <a
            class="btn"
            href="https://acebattlemile.up.railway.app/verify-member?token=${token}&ticket=${
    ticket || ''
  }"
            target="_blank"
          >
            verify email
          </a>
        </div>
      </div>
    </div>
  </body>
</html>
    `;
};
