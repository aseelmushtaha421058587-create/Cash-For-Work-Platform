/*
  Cash For Work Platform - Main JS
  Handles dynamic rendering, filtering, modal details, and form validation.
*/

$(document).ready(function () {
  // ------------------------------
  // Job data for the table
  // ------------------------------
  const jobData = [
    {
      id: 1,
      title: "Construction Helper",
      category: "Construction",
      location: "Downtown",
      payment: "$120 / day",
      status: "Open",
      description: "Assist with onsite materials and basic labor tasks for a renovation project."
    },
    {
      id: 2,
      title: "Graphic Flyer Design",
      category: "Design",
      location: "Remote",
      payment: "$180 / project",
      status: "Open",
      description: "Design a promotional flyer for a local community event using brand assets."
    },
    {
      id: 3,
      title: "Frontend Bug Fix",
      category: "Programming",
      location: "Remote",
      payment: "$250 / project",
      status: "Open",
      description: "Resolve UI layout issues and improve responsiveness on a landing page."
    },
    {
      id: 4,
      title: "Math Tutor",
      category: "Education",
      location: "North Campus",
      payment: "$25 / hour",
      status: "Closed",
      description: "Provide one-on-one tutoring for high school algebra and geometry students."
    },
    {
      id: 5,
      title: "Event Photographer",
      category: "Media",
      location: "City Hall",
      payment: "$300 / event",
      status: "Open",
      description: "Capture photos for a civic awards ceremony and deliver edited images."
    },
    {
      id: 6,
      title: "Carpentry Assistant",
      category: "Construction",
      location: "West End",
      payment: "$140 / day",
      status: "Open",
      description: "Support carpenters with measurements, sanding, and cleanup tasks."
    },
    {
      id: 7,
      title: "Logo Refresh",
      category: "Design",
      location: "Remote",
      payment: "$220 / project",
      status: "Closed",
      description: "Modernize a startup logo and provide updated brand assets."
    },
    {
      id: 8,
      title: "JavaScript Tutor",
      category: "Education",
      location: "Online",
      payment: "$30 / hour",
      status: "Open",
      description: "Teach JavaScript fundamentals to beginners using practical exercises."
    }
  ];

  // ------------------------------
  // Featured jobs data for cards
  // ------------------------------
  const featuredJobs = [
    {
      id: 101,
      title: "Warehouse Organizer",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
      description: "Organize inventory and prepare packages for delivery.",
      payment: "$110 / day",
      location: "Logistics Hub",
      fullDescription: "Sort, label, and stage packages for outbound delivery in a busy warehouse."
    },
    {
      id: 102,
      title: "Social Media Assistant",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      description: "Schedule posts and engage with followers for local brands.",
      payment: "$160 / week",
      location: "Remote",
      fullDescription: "Manage posting calendar, reply to comments, and track engagement metrics."
    },
    {
      id: 103,
      title: "UI Prototype Designer",
      image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
      description: "Create high-fidelity UI prototypes for a mobile app.",
      payment: "$280 / project",
      location: "Design Lab",
      fullDescription: "Use Figma to build interactive prototypes for client review sessions."
    },
    {
      id: 104,
      title: "After School Mentor",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80",
      description: "Support students with homework and study skills.",
      payment: "$90 / day",
      location: "Community Center",
      fullDescription: "Guide students in after-school programs and help with study planning."
    },
    {
      id: 105,
      title: "Content Videographer",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80",
      description: "Film and edit short promotional videos for campaigns.",
      payment: "$320 / project",
      location: "Media Studio",
      fullDescription: "Shoot, edit, and deliver 30-60 second promotional video clips."
    },
    {
      id: 106,
      title: "Junior Web QA",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      description: "Test website flows and report issues to the dev team.",
      payment: "$140 / day",
      location: "Remote",
      fullDescription: "Check forms, navigation, and responsiveness across devices."
    }
  ];

  // Cache DOM elements
  const $jobsTableBody = $("#jobsTable tbody");
  const $categoryFilter = $("#categoryFilter");
  const $jobSearch = $("#jobSearch");
  const $featuredJobs = $("#featuredJobs");

  // Populate category dropdown from unique categories
  const uniqueCategories = [...new Set(jobData.map(job => job.category))];
  uniqueCategories.forEach(category => {
    $categoryFilter.append(`<option value="${category}">${category}</option>`);
  });

  // Render jobs into the table
  function renderJobs(filteredJobs) {
    $jobsTableBody.empty();

    if (filteredJobs.length === 0) {
      $jobsTableBody.append(
        `<tr><td colspan="6" class="text-center">No jobs found.</td></tr>`
      );
      return;
    }

    filteredJobs.forEach(job => {
      const statusBadge =
        job.status === "Open"
          ? `<span class="badge badge-open">${job.status}</span>`
          : `<span class="badge badge-closed">${job.status}</span>`;

      $jobsTableBody.append(`
        <tr>
          <td>${job.title}</td>
          <td>${job.category}</td>
          <td>${job.location}</td>
          <td>${job.payment}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary view-job" data-job-id="${job.id}">View</button>
          </td>
        </tr>
      `);
    });
  }

  // Filter jobs based on search and category
  function filterJobs() {
    const searchTerm = $jobSearch.val().toLowerCase();
    const selectedCategory = $categoryFilter.val();

    const filteredJobs = jobData.filter(job => {
      const matchesTitle = job.title.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
      return matchesTitle && matchesCategory;
    });

    renderJobs(filteredJobs);
  }

  // Render featured job cards
  function renderFeaturedJobs() {
    featuredJobs.forEach(job => {
      $featuredJobs.append(`
        <div class="col-md-6 col-lg-4">
          <div class="card featured-card h-100">
            <img src="${job.image}" class="card-img-top" alt="${job.title}">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <p class="card-text">${job.description}</p>
              <button class="btn btn-outline-primary view-featured" data-featured-id="${job.id}">
                View Details
              </button>
            </div>
          </div>
        </div>
      `);
    });
  }

  // Modal handling
  function openJobModal(details) {
    $("#modalTitle").text(details.title);
    $("#modalDescription").text(details.description);
    $("#modalPayment").text(details.payment);
    $("#modalLocation").text(details.location);

    const modal = new bootstrap.Modal(document.getElementById("jobModal"));
    modal.show();
  }

  // Event: search input
  $jobSearch.on("input", function () {
    filterJobs();
  });

  // Event: category dropdown
  $categoryFilter.on("change", function () {
    filterJobs();
  });

  // Event: category cards click
  $(".category-card").on("click", function () {
    const category = $(this).data("category");
    $categoryFilter.val(category);
    filterJobs();
    $("html, body").animate({ scrollTop: $("#jobs").offset().top - 60 }, 600);
  });

  // Event: table view button
  $(document).on("click", ".view-job", function () {
    const jobId = Number($(this).data("job-id"));
    const job = jobData.find(item => item.id === jobId);

    if (job) {
      openJobModal({
        title: job.title,
        description: job.description,
        payment: job.payment,
        location: job.location
      });
    }
  });

  // Event: featured job view button
  $(document).on("click", ".view-featured", function () {
    const jobId = Number($(this).data("featured-id"));
    const job = featuredJobs.find(item => item.id === jobId);

    if (job) {
      openJobModal({
        title: job.title,
        description: job.fullDescription,
        payment: job.payment,
        location: job.location
      });
    }
  });

  // Contact form validation
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();

    // Reset messages
    $(".error-message").text("");
    $("#formMessage").text("");

    if (name === "") {
      $("#name").next(".error-message").text("Name is required.");
      isValid = false;
    }

    if (email === "" || !email.includes("@")) {
      $("#email").next(".error-message").text("Enter a valid email.");
      isValid = false;
    }

    if (message.length < 10) {
      $("#message").next(".error-message").text("Message must be at least 10 characters.");
      isValid = false;
    }

    if (isValid) {
      $("#formMessage").text("Message sent successfully! We will respond soon.").addClass("text-success");
      $(this)[0].reset();
    } else {
      $("#formMessage").text("Please fix the errors above.").addClass("text-danger");
    }
  });

  // Fade in featured cards on scroll
  function revealFeaturedCards() {
    $(".featured-card").each(function () {
      const cardTop = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > cardTop + 100) {
        $(this).animate({ opacity: 1 }, 600);
      }
    });
  }

  // Initial render
  renderJobs(jobData);
  renderFeaturedJobs();
  revealFeaturedCards();

  // Scroll event for fadeIn
  $(window).on("scroll", function () {
    revealFeaturedCards();
  });
});
