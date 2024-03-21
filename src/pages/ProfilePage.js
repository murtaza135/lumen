import { BaseComponent, html, history } from 'framework';
import { meQuery } from '@/api/auth/meQuery';
import { changePasswordMutation } from '@/api/auth/changePasswordMutation';
import { deleteAccountMutation } from '@/api/auth/deleteAccountMutation';
import { uploadProfilePictureMutation } from '@/api/auth/uploadProfilePictureMutation';
import { downloadProfilePictureQuery } from '@/api/auth/downloadProfilePictureQuery';

export class ProfilePage extends BaseComponent {
  constructor() {
    super();
    this.userData = this.query(meQuery());
    this.changePassword = this.mutation(changePasswordMutation());
    this.deleteAccount = this.mutation(deleteAccountMutation());
    this.uploadProfilePicture = this.mutation(uploadProfilePictureMutation());
    this.profilePictureSrc = null; // Initialise state for profile picture URL
    this.loadProfilePicture();
  }

  getInitials(firstName, lastName) {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  }

  openChangePasswordModal() {
    // Logic to open the modal
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'block';
    } else {
      console.error('Modal element not found.');
    }
  }

  closeChangePasswordModal() {
    // Logic to close the modal
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'none';
    } else {
      console.error('Modal element not found.');
    }
  }

  openDeleteUserModal() {
    const modal = document.getElementById('deleteUserModal');
    modal.style.display = 'block';
  }

  closeDeleteUserModal() {
    const modal = document.getElementById('deleteUserModal');
    modal.style.display = 'none';
  }

  openChangePFPModal() {
    console.log("openChangePFPModal called"); // Diagnostic log
    const modal = document.getElementById('changePFPModal');
    if (modal) {
      modal.style.display = 'block';
    } else {
      console.error('Change PFP Modal element not found.');
    }
}
  
  closeChangePFPModal() {
    const modal = document.getElementById('changePFPModal');
    if (modal) {
      modal.style.display = 'none';
    } else {
      console.error('Change PFP Modal element not found.');
    }
  }

  changePasswordHandler(newPassword, confirmPassword) {
    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match.');
      return;
    }
    this.changePassword.actions.mutate({ newPassword })
      .then(() => {
        console.log('Password changed successfully.');
        this.closeChangePasswordModal();
      })
      .catch((error) => {
        console.error('Error changing password:', error);
      });
  }

  submitProfilePicture = () => {
    const fileInput = document.getElementById('profilePictureInput');
    const file = fileInput.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);
    
      // Use the mutation function provided by the mutation object
      this.uploadProfilePicture.actions.mutate(formData)
        .then(response => {
          console.log('Profile picture updated successfully:', response);
          this.closeChangePFPModal();
          // Update the profile picture in the UI or refetch the user's data here
        })
        .catch(error => {
          console.error('Error updating profile picture:', error);
          // Handle error in UI, such as showing an error message
        });
    } else {
      console.error('No file selected.');
      // Optionally handle the case where no file was selected
    }
  
    // Clear the input value regardless of whether the upload was successful or not
    fileInput.value = '';
  };

  async loadProfilePicture() {
    const profilePictureData = await this.query(downloadProfilePictureQuery());
    if (profilePictureData && profilePictureData.src) {
      this.profilePictureSrc = profilePictureData.src;
      this.update(); // Assuming `update` is a method to trigger re-render. Adjust as needed.
    }
  }

  deleteUserHandler = () => {
    const userId = this.userData.state.data.id;
    this.deleteAccount.actions.mutate(userId)
      .then(() => {
        console.log('Account deleted successfully.');
        history.push('/login');
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
  };

  render() {
    if (this.userData.state.status === 'loading') {
      return html`<p>Loading...</p>`;
    }

    if (this.userData.state.status === 'error') {
      return history.push('/login');
    }

    const user = this.userData.state.data;
    const initials = this.getInitials(user.first_name, user.last_name);
    const initialsSVG = `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100" height="100" fill="#00aaff"></rect>
        <text x="50" y="50" font-family="Arial, sans-serif" font-size="50" fill="#ffffff" text-anchor="middle" dy=".3em">${initials}</text>
      </svg>
    `)}`;

    // Conditional rendering based on the profile picture URL
    const profilePictureDisplay = this.profilePictureSrc
      ? html`<img src="${this.profilePictureSrc}" alt="Profile Picture" style="width: 250px; height: 250px; border-radius: 50%;" />`
      : html`<img src="${initialsSVG}" alt="Profile Initials" style="width: 250px; height: 250px; border-radius: 50%;" />`;


    return html`
      <auth-guard />
      <error-toast/>

      <style>

        .profile-container {
          display: flex;
          background: #117a88;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px; /* Increased padding */
          max-width: 1920px; /* Increased max-width */
          margin: 40px; /* Increased margin to add space around the container */
          align-items: flex-start; /* Align items to the start */
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          padding: 20px;
          margin-right: 20px; /* Adjusted margin for spacing between sections */
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
          width: 37.5%; /* 37.5% width on big screens */
          height: 361.25px; /* Ensure both sections have the same height on larger screens */
        }

        .data-fields-section {
          flex-grow: 1; /* Allow this section to fill the remaining space */
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
          width: 60%; /* 60% width on big screens */
          height: 100%; /* Ensure both sections have the same height on larger screens */
        }

        .profile-section img {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          border: 1px solid #000; /* Add a thin black border */
        }

        @media (max-width: 768px) {
          .profile-container {
            flex-direction: column;
            padding: 20px; /* Reduced padding for smaller screens */
          }

          .profile-section, .data-fields-section {
            width: 100%;
            margin: 10px 0;
            height: auto; /* Reset height on smaller screens */
          }

          .profile-section {
            margin-right: 0; /* Remove margin-right on smaller screens */
          }
          /* Styles for the modal on smaller screens */
    
        }

        .modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
          display: flex;
          align-items: center;
          justify-content: center;
        }

  /* Modal Content/Box */
  .modal-content {
  margin: auto;
  background-color: #017374; /* Teal background */
  padding: 20px;
  top: 225px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px; /* Adjust as per your design */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

  /* The Close Button */
  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 10px;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
  }

  /* Button styles */
  .button, #submitChange, #confirmDelete, #cancelDelete {
    background-color: black;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: block; /* Change to block to occupy full width */
    font-size: 16px;
    margin: 10px auto; /* Center buttons */
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px; /* Rounded corners for buttons */
  }

  #cancelDelete{
    background-color:white;
    color:black;
  }

  #cancelDelete:hover {
    background-color: #dddddd; /* Grey highlight on hover */
    color: white;
  }

  #confirmDelete:hover {
    background-color: red; /* Red highlight on hover */
    color: white;
  }

  #submitChange:hover {
    background-color: #3b3b3b; /* Grey highlight on hover */
    color: white;
  }

  .button:hover {
    opacity: 0.8;
  }

  /* Style all the input fields */
  input[type=password]{
    width: calc(100% - 40px);
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    color:white;
  }
  input[type=text], input[type=email] {
    width: calc(100% - 40px);
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    /* Styles for the modal on smaller screens */
    .modal-content {
      width: 90%; /* Increase width to 90% of the screen */
      margin: 10% auto; /* Increase top margin to center it vertically */
    }

    .close {
      font-size: 36px; /* Larger font size for the close button */
    }
  }
</style>

      <div>
        <x-nav hasAdmin="true" hasDashboard="true" hasChat="true" hasLogout="true" hasUserProfile="true" />

        <div class="profile-container">
          <!-- Profile Section -->
          <div class="profile-section">
             ${profilePictureDisplay}
             <button @click=${this.openChangePFPModal} style="background-color: #00aaff; color: white; padding: 10px 20px; border: none; border-radius: 20px; cursor: pointer; margin-top: 10px;">Change PFP</button>
          </div>
          <!-- Data Fields Section -->
          <div class="data-fields-section">
            <h2 style="color: #333; margin-bottom: 20px;">Profile</h2>
            <div style="margin-bottom: 20px;">
              <label style="display: block; color: #333; margin-bottom: 5px;">Email:</label>
              <input type="email" placeholder="Email" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;" />
            </div>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
              <div style="flex-grow: 1;">
                <label style="display: block; color: #333; margin-bottom: 5px;">First Name:</label>
                <input type="text" placeholder="First Name" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;" />
              </div>
              <div style="flex-grow: 1;">
                <label style="display: block; color: #333; margin-bottom: 5px;">Last Name:</label>
                <input type="text" placeholder="Last Name" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;" />
              </div>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <button @click=${this.openChangePasswordModal} style="background-color: #00aaff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Change Password</button>
              <button @click=${this.openDeleteUserModal} style="background-color: #ff4136; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Delete Account</button>
            </div>
          </div>
          <!-- Change Password Modal -->
          <div id="changePasswordModal" class="modal" style="display: none;">
            <div class="modal-content">
              <span class="close" @click=${this.closeChangePasswordModal}>&times;</span>
              <h2 style="color: white;">Change Password</h2>
              <input type="password" id="oldPassword" placeholder="Old Password" />
              <input type="password" id="newPassword" placeholder="New Password" />
              <input type="password" id="confirmNewPassword" placeholder="Confirm New Password" />
              <button id="submitChange" @click=${() => {
                const newPasswordInput = document.querySelector('#newPassword');
                const confirmPasswordInput = document.querySelector('#confirmNewPassword');
                const newPassword = newPasswordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                this.changePasswordHandler(newPassword, confirmPassword);
                }}>Submit</button>
            </div>
          </div>
          <!-- Delete User Modal -->
          <div id="deleteUserModal" class="modal" style="display: none;">
            <div class="modal-content">
              <span class="close" @click=${this.closeDeleteUserModal}>&times;</span>
              <h2 style="color: white;">Delete Account</h2>
              <strong>Are you sure you want to delete your account?</strong>
              <button id="confirmDelete" @click=${this.deleteUserHandler}>Confirm</button>
              <button id="cancelDelete" @click=${this.closeDeleteUserModal}>Cancel</button>
            </div>
          </div>
          <!-- Change Profile Picture Modal -->
          <div id="changePFPModal" class="modal" style="display: none;">
            <div class="modal-content">
              <span class="close" @click=${this.closeChangePFPModal}>&times;</span>
              <h2 style="color: white;">Change Profile Picture</h2>
              <input type="file" id="profilePictureInput" accept="image/*" />
              <button @click=${this.submitProfilePicture}>Submit</button>
            </div>
          </div>
        </div>
    `;
  }
}
