class RegistrationsController < Devise::RegistrationsController

    respond_to :json

    # private

    # def registration_params
    #   params.require(:user).permit(:user_name, :email, :password, :password_confirmation)
    # end


end
