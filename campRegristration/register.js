const addButton = document.getElementById('add');

const participantsFieldset = document.querySelector('.participants');

let participantsCount = 1;

function participantTemplate(count) {
    return `
      <section class="participant${count}">
        <p>Participant ${count}</p>
        <div class="item">
          <label for="fname${count}"> First Name<span>*</span></label>
          <input id="fname${count}" type="text" name="fname${count}" value="" required />
        </div>
        <div class="item activities">
          <label for="activity${count}">Activity #<span>*</span></label>
          <input id="activity${count}" type="text" name="activity${count}" />
        </div>
        <div class="item">
          <label for="fee${count}">Fee ($)<span>*</span></label>
          <input id="fee${count}" type="number" name="fee${count}" />
        </div>
        <div class="item">
          <label for="date${count}">Desired Date <span>*</span></label>
          <input id="date${count}" type="date" name="date${count}" />
        </div>
        <div class="item">
          <p>Grade</p>
          <select id="grade${count}">
            <option selected value="" disabled selected></option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
      </section>
    `;
  }

addButton.addEventListener('click', () => {
    participantsCount ++;

    const newParticipant = participantTemplate(participantsCount);

    addButton.insertAdjacentHTML('beforebegin', newParticipant);

});

const registrationForm = document.querySelector('form');

const summaryElement = document.getElementById('summary');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feeInputs = document.querySelectorAll('[name^="fee"]');

    let totalFees = 0;
    feeInputs.forEach((input) => {
        totalFees +=parseFloat(input.value) || 0;

    });

    const adultName = document.getElementById('adult_name').value;

    const participantInputs = document.querySelectorAll('input[name^="fname"]');
    const participantCount = participantInputs.length

    registrationForm.style.display = 'none';
    summaryElement.style.display = 'block';

    summaryElement.textContent = `Thank you, ${adultName}, for registering. You have registered ${participantCount} participants and owe $${totalFees.toFixed(2)} in Fees.`;

})