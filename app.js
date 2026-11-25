/**
 * SPS DIABETES, THYROID & ENDOCRINE HOSPITAL
 * Domain: https://spsendocrinology.com
 * Interactive Web Application Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Drawer Navigation ---
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  // --- 2. Sticky Header Elevation on Scroll ---
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.12)';
    } else {
      siteHeader.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.08)';
    }
  });


  // --- 3. Scope of Services Filtering ---
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'all' && category === 'all')) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // --- 4. Doctor Profile & Achievement Tabs ---
  const docTabBtns = document.querySelectorAll('.doc-tab-btn');
  const docTabPanes = document.querySelectorAll('.doc-tab-pane');

  docTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      docTabBtns.forEach(b => b.classList.remove('active'));
      docTabPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetPaneId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });


  // --- 5. Interactive BMI & Health Risk Assessment Tool ---
  const btnCalculateBMI = document.getElementById('btnCalculateBMI');
  const resPlaceholder = document.getElementById('resPlaceholder');
  const resData = document.getElementById('resData');
  const resBmiValue = document.getElementById('resBmiValue');
  const resBmiCategory = document.getElementById('resBmiCategory');
  const resIdealWeight = document.getElementById('resIdealWeight');
  const resAssessmentHeading = document.getElementById('resAssessmentHeading');
  const resAssessmentText = document.getElementById('resAssessmentText');

  if (btnCalculateBMI) {
    btnCalculateBMI.addEventListener('click', () => {
      const heightCm = parseFloat(document.getElementById('userHeight').value);
      const weightKg = parseFloat(document.getElementById('userWeight').value);
      const age = parseInt(document.getElementById('userAge').value, 10);

      if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
        alert('Please enter valid height (cm) and weight (kg) values.');
        return;
      }

      // BMI calculation
      const heightM = heightCm / 100;
      const bmi = (weightKg / (heightM * heightM)).toFixed(1);

      // Ideal weight for Asian-Indians (BMI 18.5 - 22.9)
      const minHealthyKg = (18.5 * heightM * heightM).toFixed(1);
      const maxHealthyKg = (22.9 * heightM * heightM).toFixed(1);

      resBmiValue.textContent = bmi;
      resIdealWeight.textContent = `Recommended Healthy Weight for your height: ${minHealthyKg} kg – ${maxHealthyKg} kg (Asian-Indian Criteria)`;

      // Asian-Indian BMI Classification
      let category = '';
      let badgeColor = '';
      let badgeTextColor = '#ffffff';

      if (bmi < 18.5) {
        category = 'Underweight';
        badgeColor = '#0284c7'; // blue
      } else if (bmi >= 18.5 && bmi <= 22.9) {
        category = 'Normal Healthy Weight';
        badgeColor = '#16a34a'; // green
      } else if (bmi >= 23.0 && bmi <= 24.9) {
        category = 'Overweight (At-Risk)';
        badgeColor = '#d97706'; // amber
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = 'Obese Class I';
        badgeColor = '#ea580c'; // orange
      } else {
        category = 'Obese Class II (Severe)';
        badgeColor = '#dc2626'; // red
      }

      resBmiCategory.textContent = category;
      resBmiCategory.style.backgroundColor = badgeColor;
      resBmiCategory.style.color = badgeTextColor;

      // Check symptoms
      const symp1 = document.getElementById('symp1').checked; // Thirst/urination (Diabetes)
      const symp2 = document.getElementById('symp2').checked; // Fatigue/weight gain (Thyroid/Metabolic)
      const symp3 = document.getElementById('symp3').checked; // Irregular menses/facial hair (PCOS)
      const symp4 = document.getElementById('symp4').checked; // Child slow height (Growth)
      const symp5 = document.getElementById('symp5').checked; // Neck swelling (Thyroid Goitre)
      const symp6 = document.getElementById('symp6').checked; // Pregnant with high sugars/thyroid (GDM/Pregnancy)

      let recommendations = [];

      if (bmi >= 23.0) {
        recommendations.push("Your BMI is in the overweight/obesity range for South Asians. We recommend attending our Monthly Obesity Clinic (4th Saturday) for body composition analysis, visceral fat screening, and medical weight management.");
      }

      if (symp1) {
        recommendations.push("Frequent thirst/urination suggests potential hyperglycemia or early diabetes. A Fasting Blood Sugar and HbA1c screening is strongly advised.");
      }
      if (symp2) {
        recommendations.push("Unexplained fatigue or sudden weight gain is a common indicator of hypothyroidism or insulin resistance. A complete Thyroid Profile (FT3, FT4, TSH) is recommended.");
      }
      if (symp3) {
        recommendations.push("Menstrual irregularity and hirsutism strongly point to Polycystic Ovary Syndrome (PCOS). Comprehensive reproductive endocrine evaluation is available.");
      }
      if (symp4) {
        recommendations.push("For child growth delays, early assessment at our Monthly Growth Clinic (1st Saturday) allows prompt evaluation of growth velocity and growth hormone before bone plates close.");
      }
      if (symp5) {
        recommendations.push("Neck swelling requires high-resolution thyroid ultrasonography and possible USG-guided FNAC to evaluate thyroid nodules or thyroiditis.");
      }
      if (symp6) {
        recommendations.push("URGENT: Endocrine disorders and diabetes during pregnancy require strict trimester-specific glycemic control to protect maternal and fetal health.");
      }

      if (recommendations.length === 0) {
        if (bmi >= 18.5 && bmi <= 22.9) {
          resAssessmentHeading.textContent = "Optimal Health Status";
          resAssessmentText.textContent = "Your BMI is within the healthy Asian-Indian range with no high-risk endocrine symptoms reported. Maintain an active lifestyle, balanced diet, and schedule an annual health checkup.";
        } else {
          resAssessmentHeading.textContent = "Nutritional & Metabolic Advice";
          resAssessmentText.textContent = "Your weight may benefit from personalized nutritional guidance. Consult our clinical dietetics team at SPS Hospital for customized meal planning.";
        }
      } else {
        resAssessmentHeading.textContent = "Specialist Clinical Recommendations";
        resAssessmentText.innerHTML = recommendations.map(rec => `• ${rec}`).join('<br><br>');
      }

      resPlaceholder.style.display = 'none';
      resData.style.display = 'block';
    });
  }


  // --- 6. Appointment Request Form & WhatsApp Integration ---
  const appointmentForm = document.getElementById('appointmentForm');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const age = document.getElementById('patientAge').value.trim() || 'Not specified';
      const service = document.getElementById('consultService').value;
      const date = document.getElementById('preferredDate').value || 'Earliest available';
      const timeSlot = document.getElementById('preferredTime').value;
      const notes = document.getElementById('patientNotes').value.trim() || 'None';

      if (!name || !phone || !service) {
        alert('Please fill in your name, mobile number, and requested service.');
        return;
      }

      // Format WhatsApp message
      const message = `Hello SPS Endocrine Hospital,
I would like to request an appointment with Dr. Nagapriya Minnekanti.

Patient Details:
• Name: ${name}
• Mobile: ${phone}
• Age: ${age}
• Specialty / Service: ${service}
• Preferred Date: ${date}
• Preferred Time: ${timeSlot}
• Clinical Notes: ${notes}

Please confirm my consultation schedule. Thank you!`;

      const encodedMessage = encodeURIComponent(message);
      // Primary WhatsApp number: 9491311371
      const waUrl = `https://wa.me/919491311371?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');

      alert(`Thank you, ${name}! Your appointment request is being redirected to our WhatsApp booking desk (+91 9491311371). Our reception will confirm your slot shortly.`);
      appointmentForm.reset();
    });
  }


  // --- 7. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        otherAnswer.style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 40 + 'px';
      }
    });
  });


  // --- 8. Interactive Doctor Photo Editor & Persistence ---
  const doctorPhotoInput = document.getElementById('doctorPhotoInput');
  const mainDoctorPhoto = document.getElementById('mainDoctorPhoto');
  const heroDoctorPhoto = document.getElementById('heroDoctorPhoto');
  const btnResetDoctorPhoto = document.getElementById('btnResetDoctorPhoto');
  const defaultPhotoSrc = 'assets/images/dr-nagapriya.png';

  // Load custom doctor photo from localStorage if present
  const savedDoctorPhoto = localStorage.getItem('sps_custom_doctor_photo');
  if (savedDoctorPhoto) {
    if (mainDoctorPhoto) mainDoctorPhoto.src = savedDoctorPhoto;
    if (heroDoctorPhoto) heroDoctorPhoto.src = savedDoctorPhoto;
    if (btnResetDoctorPhoto) btnResetDoctorPhoto.style.display = 'inline-flex';
  }

  // Handle uploading / editing doctor photo
  if (doctorPhotoInput) {
    doctorPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const customDataUrl = event.target.result;
        if (mainDoctorPhoto) mainDoctorPhoto.src = customDataUrl;
        if (heroDoctorPhoto) heroDoctorPhoto.src = customDataUrl;
        
        try {
          localStorage.setItem('sps_custom_doctor_photo', customDataUrl);
          if (btnResetDoctorPhoto) btnResetDoctorPhoto.style.display = 'inline-flex';
          alert('Doctor photograph updated successfully! Your chosen picture is saved and active.');
        } catch (err) {
          console.warn('Storage limit reached, displayed without persistent localStorage cache');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle resetting back to original doctor photo
  if (btnResetDoctorPhoto) {
    btnResetDoctorPhoto.addEventListener('click', () => {
      if (confirm('Reset doctor picture back to original website photograph?')) {
        localStorage.removeItem('sps_custom_doctor_photo');
        if (mainDoctorPhoto) mainDoctorPhoto.src = defaultPhotoSrc;
        if (heroDoctorPhoto) heroDoctorPhoto.src = defaultPhotoSrc;
        btnResetDoctorPhoto.style.display = 'none';
        if (doctorPhotoInput) doctorPhotoInput.value = '';
        alert('Doctor photograph reset to default.');
      }
    });
  }

});
