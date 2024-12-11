// show more show less end



document.addEventListener("DOMContentLoaded", function () {
    const moreBtns = document.querySelectorAll('.more-btn');
    const docBtns = document.querySelectorAll('.more-btn.doc-btn');
    const allBtns = [...moreBtns, ...docBtns];

    for (let i = 0; i < allBtns.length; i++) {
        const documentList = document.querySelectorAll('.document-list')[i];
        const listAttr = parseInt(documentList.getAttribute('data-showItem'));
        const docWrappers = documentList.querySelectorAll('.doc-wrapper');
        const button = allBtns[i];

        // Ensure that there are doc wrappers to show
        if (!docWrappers || docWrappers.length === 0) {
            continue; // Skip if no wrappers exist
        }

        // Show only `listAttr` items initially
        docWrappers.forEach((wrapper, index) => {
            wrapper.style.display = index < listAttr ? 'flex' : 'none';
        });

        // Hide the button if docWrappers count <= listAttr
        if (docWrappers.length <= listAttr) {
            button.style.display = 'none';
        } else {
            button.style.display = 'flex';
        }

        let isExpanded = false;

        // Add click event to toggle visibility
        button.addEventListener('click', function() {
            if (isExpanded) {
                // Collapse: Show only `listAttr` items
                docWrappers.forEach((wrapper, index) => {
                    wrapper.style.display = index < listAttr ? 'flex' : 'none';
                });

                // Change button text to "Show more"
                if(button.classList.contains('doc-btn')) {
                    button.innerHTML = "Charger Plus <i class='arrow-tag'></i>";
                } else {
                    button.innerHTML = "Afficher la suite <i class='arrow-tag'></i>";
                }

                isExpanded = false;
            } else {
                // Expand: Show all items
                docWrappers.forEach(wrapper => {
                    wrapper.style.display = 'flex';
                });

                // Change button text to "Show less"
                if(button.classList.contains('doc-btn')) {
                    button.innerHTML = "Charger Less <i class='arrow-tag rotate'></i>";
                } else {
                    button.innerHTML = "Afficher moins <i class='arrow-tag rotate'></i>";
                }

                isExpanded = true;
            }
        });
    }
});
function openPopup(videoSrc, title, description) {
    // Set video source
    const videoElement = document.querySelector('video');
    const videoSourceMP4 = document.getElementById('popup-video-source');
    const videoSourceOGG = document.getElementById('popup-video-source-ogg');
    // const Body = document.querySelector('body');
    

    // Ensure the sources are updated correctly
    videoSourceMP4.src = videoSrc; // Set the MP4 source
    videoSourceOGG.src = videoSrc.replace('.mp4', '.ogg'); // Optional, for .ogg support

    // Update video title and description
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-description').textContent = description;

    // Show the popup
    document.querySelector('.popup-wrap').style.display = 'flex';
    document.querySelector('body').classList.add('overflow');
    
    // Load the video after setting the source
    videoElement.load(); // This will reload the video with the new source
    videoElement.play(); // Optionally, start playing the video immediately
}

function closePopup() {
    // Hide the popup
    document.querySelector('.popup-wrap').style.display = 'none';
    document.querySelector('body').classList.add('class-name');

    // Pause the video when the popup is closed
    const videoElement = document.querySelector('video');
    videoElement.pause();
    videoElement.currentTime = 0; // Reset the video to the beginning
}

function closePopup() {
    // Hide the popup
    document.querySelector('.popup-wrap').style.display = 'none';
    document.querySelector('body').classList.remove('overflow');
}
// popup video end

// filter start
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".filters .filter");
    const newsflex = document.querySelector(".actualités-flex");
    const moreBtn = document.querySelector(".btn.charger-plus");

    if (items.length > 0 && newsflex && moreBtn) {
        const products = Array.from(newsflex.querySelectorAll(".news-content-list"));
        const showItemAttr = newsflex.getAttribute("data-showitem");
        const showItemCount = parseInt(showItemAttr, 10);

        let isShowMore = false;
        let activeFilter = "all";

        function filterItems() {
            let visibleCount = 0;

            products.forEach((item) => {
                const matchesFilter =
                    activeFilter === "all" ||
                    item.getAttribute("data-filter").toLowerCase() === activeFilter.toLowerCase();

                if (matchesFilter && (isShowMore || visibleCount < showItemCount)) {
                    item.style.display = "flex";
                    visibleCount++;
                } else {
                    item.style.display = "none";
                }
            });

            // Update the "more" button text
            moreBtn.innerHTML = isShowMore
                ? "Charger less <i class='arrow-tag rotate'></i>"
                : "Charger plus <i class='arrow-tag'></i>";
        }

        function setActiveFilter(selectedItem) {
            if (!selectedItem) {
                return;
            }

            items.forEach((item) => {
                item.classList.remove("active");
            });

            selectedItem.classList.add("active");
        }

        items.forEach((item) => {
            item.addEventListener("click", () => {
                isShowMore = false;
                activeFilter = item.getAttribute("data-filter");
                setActiveFilter(item);
                filterItems();
            });
        });

        moreBtn.addEventListener("click", function (event) {
            event.preventDefault();
            isShowMore = !isShowMore;
            filterItems();
        });

        filterItems();
        setActiveFilter(document.querySelector(".filters .filter[data-filter='all']"));
    }
});


// filter end


// accordian start
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        document.querySelectorAll(".accordion-content").forEach((item) => {
            if (item !== content) {
                item.style.display = "none";
            }
        });
        accordionHeaders.forEach((otherHeader) => {
            if (otherHeader !== header) {
                otherHeader.classList.remove("active");
            }
        });

        // Toggle the clicked item
        if (content.style.display === "block") {
            content.style.display = "none";
            header.classList.remove("active");
        } else {
            content.style.display = "block";
            header.classList.add("active");
        }
    });
});


// accordian end

// search a keyword start
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const filterTags = document.querySelectorAll('.filter');
const accordionWrapflexs = document.querySelectorAll('.filter-wraps');

// Search functionality
if (searchBtn) {
    searchBtn.addEventListener('click', function () {
        const searchText = searchInput.value.toLowerCase().trim();
        const itemClass = document.querySelector('.accordian-item') ? '.accordian-item' : '.filter-item';

        accordionWrapflexs.forEach(flex => {
            const accordionItems = flex.querySelectorAll(itemClass);
            var dataShowItem = flex.querySelector('.document-list');
            var showBtn = flex.querySelector('.btn');
            var dataShowItemCnt = parseInt(dataShowItem.getAttribute("data-showitem"));
            let visibleCount = 0;

            accordionItems.forEach(item => {
                const headerText = item.querySelector('.accordion-header h4')
                    ? item.querySelector('.accordion-header h4').textContent.toLowerCase()
                    : item.querySelector('.doc-content .doc-text').textContent.toLowerCase();

                if (headerText.includes(searchText)) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            console.log(visibleCount)
            if(visibleCount > dataShowItemCnt){
                if(showBtn.classList.contains('doc-btn')) {
                    showBtn.innerHTML = "Charger Less <i class='arrow-tag rotate'></i>";
                } else {
                    showBtn.innerHTML = "Afficher moins <i class='arrow-tag rotate'></i>";
                }
                
            }else{
                if(showBtn.classList.contains('doc-btn')) {
                    showBtn.innerHTML = "Charger Plus <i class='arrow-tag'></i>";
                } else {
                    showBtn.innerHTML = "Afficher la suite <i class='arrow-tag'></i>";
                }
            }
            // Show or hide the flex based on visible items
            flex.style.display = visibleCount > 0 ? 'block' : 'none';
        });

        // Reset filters if search is performed
        filterTags.forEach(tag => tag.classList.remove('active'));
    });
}

// Filter functionality
// filterTags.forEach(filter => {
//     filter.addEventListener('click', function () {
//         const filterText = filter.dataset.filter.toLowerCase();

//         // Clear search input on filter click
//         if (searchInput) searchInput.value = '';
//         filterTags.forEach(tag => tag.classList.remove('active'));
//         filter.classList.add('active');

//         accordionWrapflexs.forEach(flex => {
//             const headerText = flex.querySelector('h2').textContent.toLowerCase();
//             if (headerText.includes(filterText)) {
//                 flex.style.display = 'flex';
//                 const accordionItems = flex.querySelectorAll('.accordion-item');
//                 accordionItems.forEach(item => (item.style.display = 'flex'));
//             } else {
//                 flex.style.display = 'none';
//             }
//         });
//     });
// });



// search a keyword end



document.addEventListener("DOMContentLoaded", function () {
    const yearTags = document.querySelectorAll(".year-tag");
    const portraits = document.querySelectorAll(".potraits-item");
    const winnerBtn = document.querySelector(".winner-btn");
    let activeYear = null;
    function resetActiveClass() {
        yearTags.forEach((yearTag) => yearTag.classList.remove("active"));
    }
    function filterByYear(year) {
        let hasVisiblePortraits = false;
        portraits.forEach((portrait) => {
            if (portrait.querySelector(".year").textContent.trim() === year) {
                portrait.style.display = ""; // Show matching portraits
                hasVisiblePortraits = true;
            } else {
                portrait.style.display = "none"; // Hide non-matching portraits
            }
        });
        return hasVisiblePortraits;
    }
    yearTags.forEach((yearTag) => {
        yearTag.addEventListener("click", function () {
            const selectedYear = yearTag.textContent.trim();
            if (selectedYear === activeYear) return;

            resetActiveClass();
            yearTag.classList.add("active");
            activeYear = selectedYear;
            const hasVisiblePortraits = filterByYear(activeYear);
            if (!hasVisiblePortraits) {
                yearTag.classList.add("disabled");
            }
        });
    });

    if (winnerBtn) {
        winnerBtn.addEventListener("click", function () {
            if (activeYear) {
                filterByYear(activeYear);
            } else {
                portraits.forEach((portrait) => {
                    portrait.style.display = "";
                });
            }
        });
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const proadBtns = document.querySelectorAll('.prodcast-btn');
    const docBtns = document.querySelectorAll('.more-btn.doc-btn');
    const allBtns = [...proadBtns, ...docBtns];

    allBtns.forEach(moreBtn => {
        const container = moreBtn.closest('.container');
        const docWrappers = container.querySelectorAll('.prodcast-item');
        const indexValue = container.querySelector('.prodcast-list');

        // Ensure required elements exist
        if (!indexValue || docWrappers.length === 0) {
            console.log("Missing required elements in container:", container);
            return;
        }

        const listAttr = parseInt(indexValue.getAttribute('data-showItem'));
        if (isNaN(listAttr)) {
            console.log("Invalid or missing 'data-showItem' attribute in:", indexValue);
            return;
        }

        // Check if there are more items than the `data-showItem` value
        if (listAttr < docWrappers.length) {
            let isShowMore = false;

            function toggleItems() {
                docWrappers.forEach((item, index) => {
                    item.style.display = index >= listAttr && !isShowMore ? "none" : "flex";
                });

                // Update button text
                if (moreBtn.classList.contains('doc-btn')) {
                    moreBtn.innerHTML = isShowMore
                        ? "Charger Less <i class='arrow-tag rotate'></i>"
                        : "Charger Plus <i class='arrow-tag'></i>";
                } else {
                    moreBtn.innerHTML = isShowMore
                        ? "Afficher moins <i class='arrow-tag rotate'></i>"
                        : "Afficher la suite <i class='arrow-tag'></i>";
                }
            }

            // Initialize the toggle functionality
            toggleItems();

            // Attach click event listener
            moreBtn.addEventListener("click", function () {
                isShowMore = !isShowMore;
                toggleItems();
            });
        } else {
            // Hide the button if no extra items
            moreBtn.style.display = "none";
        }
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const prodcastList = document.querySelector(".prodcast-list");
    const prodcastItems = prodcastList.querySelectorAll(".prodcast-item");
    const btn = document.querySelector(".prodcasts-btn");
    const showItemCount = parseInt(prodcastList.getAttribute("data-showitem"), 10);

    // Initially hide extra items
    prodcastItems.forEach((item, index) => {
        if (index >= showItemCount) {
            item.style.display = "none";
        }
    });

    // Hide button if all items are within the limit
    if (prodcastItems.length <= showItemCount) {
        btn.style.display = "none";
    }

    // Toggle show/hide on button click
    btn.addEventListener("click", () => {
        const isExpanded = btn.classList.toggle("expanded");

        prodcastItems.forEach((item, index) => {
            item.style.display = isExpanded || index < showItemCount ? "block" : "none";
        });

        btn.innerHTML = isExpanded
            ? 'Charger Less <i class="arrow-tag rotate"></i>'
            : 'Charger Plus <i class="arrow-tag"></i>';
    });
});


// actualités-block
// const ActualiesBlock = document.querySelector('.actualités-block');
// const chargerBtn = document.querySelector('.charger-btn');
// const ActualiesBlockDataShowItem = parseInt(ActualiesBlock.getAttribute('data-showItem'));
// const NewsContentListAll = document.querySelectorAll('.news-content-list');
// const ActualiteFilter = document.querySelectorAll('.actualite-filter');

// if(NewsContentListAll.length > ActualiesBlockDataShowItem){
//     //then show only those NewsContentListAll till the ActualiesBlockDataShowItem
//     NewsContentListAll.forEach((item, index) => {
//         if (index >= ActualiesBlockDataShowItem) {
//             item.style.display = 'none'; // Hide items exceeding the limit
//         }
//     });

//     chargerBtn.innerHTML = 'Charger Plus <i class="arrow-tag"></i>';
// }else{
//     chargerBtn.style.display = 'none';
// }

// chargerBtn.addEventListener('click', () => {
//     const isAllVisible = Array.from(NewsContentListAll).every(
//         (item, index) => index < ActualiesBlockDataShowItem || item.style.display === ''
//     );

//     if (isAllVisible) {
//         // Hide items exceeding the limit
//         NewsContentListAll.forEach((item, index) => {
//             if (index >= ActualiesBlockDataShowItem) {
//                 item.style.display = 'none';
//             }
//         });
//         chargerBtn.innerHTML = 'Charger Plus <i class="arrow-tag"></i>';
//     } else {
//         // Show all items
//         NewsContentListAll.forEach((item) => {
//             item.style.display = '';
//         });
//         chargerBtn.innerHTML = 'Charger Less <i class="arrow-tag rotate"></i>';
//     }
// });

const ActualiesBlock = document.querySelector('.actualités-block');
const chargerBtn = document.querySelector('.charger-btn');
let ActualiesBlockDataShowItem = 0;

// Check if ActualiesBlock exists and if the data-showItem attribute is valid
if (ActualiesBlock && ActualiesBlock.getAttribute('data-showItem')) {
    ActualiesBlockDataShowItem = parseInt(ActualiesBlock.getAttribute('data-showItem'), 10);

    // Apply validation: Ensure that the value is greater than 0
    if (isNaN(ActualiesBlockDataShowItem) || ActualiesBlockDataShowItem <= 0) {
        console.error('Invalid or non-positive value for data-showItem.');
    } else {
        const NewsContentListAll = document.querySelectorAll('.news-content-list');
        const ActualiteFilters = document.querySelectorAll('.actualite-filter');
        let currentFilter = null; // To track the current filter

        // Function to update the visible items based on the filter
        function updateVisibleItems() {
            let visibleCount = 0;
            let totalMatchingItems = 0;

            NewsContentListAll.forEach((item) => {
                const matchesFilter = currentFilter === null || item.getAttribute('data-filter') === currentFilter;

                if (matchesFilter) {
                    totalMatchingItems++;
                    if (visibleCount < ActualiesBlockDataShowItem) {
                        item.style.display = ''; // Show the item
                        visibleCount++;
                    } else {
                        item.style.display = 'none'; // Hide extra items
                    }
                } else {
                    item.style.display = 'none'; // Hide non-matching items
                }
            });

            // Show or hide the button based on total matching items
            if (totalMatchingItems <= ActualiesBlockDataShowItem) {
                chargerBtn.style.display = 'none';
            } else {
                chargerBtn.style.display = '';
                chargerBtn.innerHTML = 'Charger Plus <i class="arrow-tag"></i>';
            }
        }

        // Initialize the visible items
        updateVisibleItems();

        // Handle filter click
        ActualiteFilters.forEach((filter) => {
            filter.addEventListener('click', () => {
                currentFilter = filter.getAttribute('data-filter');
                updateVisibleItems();
            });
        });

        // Handle "Charger Plus / Charger Less" button
        chargerBtn.addEventListener('click', () => {
            const isAllVisible = Array.from(NewsContentListAll).every(
                (item) =>
                    item.style.display === '' ||
                    (currentFilter !== null && item.getAttribute('data-filter') !== currentFilter)
            );

            if (isAllVisible) {
                // Hide extra items
                updateVisibleItems();
            } else {
                // Show all matching items
                NewsContentListAll.forEach((item) => {
                    if (currentFilter === null || item.getAttribute('data-filter') === currentFilter) {
                        item.style.display = '';
                    }
                });
                chargerBtn.innerHTML = 'Charger Less <i class="arrow-tag rotate"></i>';
            }
        });
    }
}


const searchButtonBlock = document.getElementById('searchBtnBlock');
const searchInputText = document.getElementById('searchInputText');
const accordianWrapBlock = document.querySelectorAll('.accordian-wrap-block');

searchButtonBlock.addEventListener('click', () => {
    const searchValue = searchInputText.value.toLowerCase(); // Convert to lowercase for case-insensitive matching

    if (searchValue) {
        accordianWrapBlock.forEach(block => {
            let hasVisibleItem = false; // Flag to track if there's at least one visible item in the block
            const accordianItems = block.querySelectorAll('.accordion-item');
            console.log(accordianItems);
            accordianItems.forEach(item => {
                const accordianHeader = item.querySelector('.accordion-header');
                const h4 = accordianHeader.querySelector('h4');
                if (h4 && h4.textContent.toLowerCase().includes(searchValue)) {
                    item.style.display = 'block'; // Show the item
                    hasVisibleItem = true; // Mark as visible
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });

            // If no items are visible, hide the entire accordion block
            if (hasVisibleItem) {
                block.style.display = 'block'; // Show the block
            } else {
                block.style.display = 'none'; // Hide the block
            }
        });
    } else {
        // If there is no search value, show all items in all accordion blocks
        accordianWrapBlock.forEach(block => {
            const accordianItems = block.querySelectorAll('.accordion-item');
            accordianItems.forEach(item => {
                item.style.display = 'block'; // Show all items
            });
            block.style.display = 'block'; // Ensure the block itself is shown
        });
    }
});
