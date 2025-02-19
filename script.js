// Enlarged D3.js Gauge Chart with Proper Left & Right Hover Effects and Smooth Fill Animation
const width = 450, height = 225, radius = Math.min(width, height);
const dataset = { percentage: 65, hoverLeftValue: 75, hoverRightValue: 85 }; // Added hover values for both sides

const svg = d3.select("body")
    .append("svg")
    .attr("width", width + 50) // Add extra padding
    .attr("height", height + 50) // Add extra padding
    .attr("viewBox", `0 0 ${width + 50} ${height + 50}`) // Ensure the entire chart is visible
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("overflow", "visible");

const arc = d3.arc()
    .innerRadius(radius * 0.75) // Increased thickness by 25%
    .outerRadius(radius * 1.25);

// Left (light blue) side with animation
const leftArc = svg.append("path")
    .datum({ startAngle: -Math.PI / 2, endAngle: -Math.PI / 2 }) // Start from zero
    .attr("d", arc)
    .attr("fill", "#5A86B6") // Lightened initial color
    .attr("transform", `translate(${(width + 50) / 2},${(height + 50)})`)
    .transition()
    .duration(1000) // Animation duration
    .attrTween("d", function(d) {
        const interpolate = d3.interpolate(-Math.PI / 2, (dataset.percentage / 100) * Math.PI - Math.PI / 2);
        return function(t) {
            d.endAngle = interpolate(t);
            return arc(d);
        };
    })
    .on("end", function() { // Restore hover effect after animation
        d3.select(this)
            .on("mouseover", function() {
                d3.select(this).attr("fill", "#274690"); // Darker hover color
                hoverText.text(`Hover Value: ${dataset.hoverLeftValue}%`).attr("fill", "#274690");
            })
            .on("mouseout", function() {
                d3.select(this).attr("fill", "#5A86B6");
                hoverText.text("");
            });
    });

// Right (light red) side with animation
const rightArc = svg.append("path")
    .datum({ startAngle: (dataset.percentage / 100) * Math.PI - Math.PI / 2, endAngle: (dataset.percentage / 100) * Math.PI - Math.PI / 2 }) // Start from center
    .attr("d", arc)
    .attr("fill", "#B34630") // Lightened initial color
    .attr("transform", `translate(${(width + 50) / 2},${(height + 50)})`)
    .transition()
    .duration(1000) // Animation duration
    .attrTween("d", function(d) {
        const interpolate = d3.interpolate((dataset.percentage / 100) * Math.PI - Math.PI / 2, Math.PI / 2);
        return function(t) {
            d.endAngle = interpolate(t);
            return arc(d);
        };
    })
    .on("end", function() { // Restore hover effect after animation
        d3.select(this)
            .on("mouseover", function() {
                d3.select(this).attr("fill", "#881600"); // Darker hover color
                hoverText.text(`Hover Value: ${dataset.hoverRightValue}%`).attr("fill", "#881600");
            })
            .on("mouseout", function() {
                d3.select(this).attr("fill", "#B34630");
                hoverText.text("");
            });
    });

const text = svg.append("text")
    .attr("x", (width + 50) / 2)
    .attr("y", (height + 50) / 2 + 30) // Adjusted for larger size
    .attr("text-anchor", "middle")
    .attr("font-size", "30px") // Increased text size by 50%
    .attr("fill", dataset.percentage >= 50 ? "#274690" : "#881600") // Text matches candidate color
    .text(`${dataset.percentage}%`);

const hoverText = svg.append("text")
    .attr("x", (width + 50) / 2)
    .attr("y", (height + 50) / 2 + 60) // Moved below the percentage
    .attr("text-anchor", "middle")
    .attr("font-size", "24px")
    .attr("fill", "")
    .text("");
