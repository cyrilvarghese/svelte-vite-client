<script lang="ts">
     import { projects } from "../store/projectStore";
 
  import type { Project } from 'src/types'; // Adjust path as needed

  let projectId: number = 1; // Example project ID, set this dynamically as needed
  let name: string = "";
  let description: string = "";
  let files: FileList | null = null;
  let errorMessage: string = "";

  async function handleSubmit() {
      if (!files || files.length === 0) {
          errorMessage = "Please select at least one file to upload.";
          return;
      }
      try {
          await projects.createJobWithFiles(projectId, name, description, files);
          alert("Job and files created successfully!");
          // Reset form or navigate away
          name = "";
          description = "";
          files = null;
      } catch (error:any) {
          errorMessage = `Failed to create job and files: ${error.message}`;
      }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2>Create Job with Files</h2>
  <div>
      <label for="name">Job Name:</label>
      <input type="text" id="name" bind:value={name} required>
  </div>
  <div>
      <label for="description">Job Description:</label>
      <input type="text" id="description" bind:value={description} required>
  </div>
  <div>
      <label for="files">Select Files:</label>
      <input type="file" id="files" multiple bind:files={files}>
  </div>
  {#if errorMessage}
      <p class="error">{errorMessage}</p>
  {/if}
  <button type="submit">Create Job</button>
</form>

<style>
  label {
      display: block;
      margin-top: 10px;
  }
  input, button {
      margin-top: 5px;
  }
  .error {
      color: red;
  }
</style>
