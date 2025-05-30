// File: public/wgsl/square-flat.wgsl
// (no semicolons after the vec3<f32> fields)

///////////////////////////////////////////////////////////////////////////////
// Vertex input — two attributes: position (location 0) and color (location 1)
///////////////////////////////////////////////////////////////////////////////
struct VertexInput {
  @location(0) position : vec3<f32>,
  @location(1) color    : vec3<f32>,
};

///////////////////////////////////////////////////////////////////////////////
// Vertex output — clip-space position + color that the fragment shader reads
///////////////////////////////////////////////////////////////////////////////
struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0)       fragColor : vec3<f32>,
};

///////////////
// Vertex stage
///////////////
@vertex
fn vs_main(input : VertexInput) -> VertexOutput {
  var out : VertexOutput;
  out.Position  = vec4<f32>(input.position, 1.0); // passthrough position
  out.fragColor = input.color;                    // passthrough color
  return out;
}

////////////////
// Fragment stage
////////////////
@fragment
fn fs_main(v : VertexOutput) -> @location(0) vec4<f32> {
  return vec4<f32>(v.fragColor, 1.0);             // output interpolated color
}
