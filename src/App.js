import "./App.css";
import axios from "axios";
import { Captcha, captchaSettings } from "reactjs-captcha";
import { useState } from "react";

function App() {
  const [captcha, setCaptcha] = useState(null);

  captchaSettings.set({
    captchaEndpoint:
      "http://php-docker.local:8080/botdetect-captcha-lib/simple-botdetect.php",
  });

  const formHandler = async (event) => {
    event.preventDefault();

    // the user-entered captcha code value to be validated at the backend side
    const userEnteredCaptchaCode = captcha.getUserEnteredCaptchaCode();

    // the id of a captcha instance that the user tried to solve
    const captchaId = captcha.getCaptchaId();

    const postData = {
      userEnteredCaptchaCode,
      captchaId,
    };

    // post the captcha data to the /your-app-backend-path on your backend.
    // make sure you import the axios in this view with: import axios from 'axios';

    try {
      const response = await axios.post(
        "http://php-docker.local:8080/captcha-validator.php",
        JSON.stringify(postData),
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
      if (response.data.success === false) {
        // captcha validation failed; reload image
        captcha.reloadImage();
        // TODO: maybe display an error message, too
      } else {
        alert("Validation correct!");
      }
    } catch (exception) {
      alert(exception.toString());
    }
  };

  return (
    <div className="App">
      <form method="POST" onSubmit={formHandler}>
        {/* captcha challenge: placeholder */}
        <Captcha
          captchaStyleName="yourFirstCaptchaStyle"
          ref={(captcha) => {
            setCaptcha(captcha);
          }}
        />
        <label>
          <span>Retype the characters from the picture:</span>
          {/* captcha code: user-input textbox */}
          <input id="yourFirstCaptchaUserInput" type="text" />
        </label>

        <button type="submit" id="submitButton">
          Validate
        </button>
      </form>
    </div>
  );
}

export default App;
