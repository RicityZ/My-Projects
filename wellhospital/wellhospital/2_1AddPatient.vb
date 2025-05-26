Imports System.Data.SqlClient

Public Class AddPatient

    Private Sub Buttonhome_Click(sender As Object, e As EventArgs) Handles HOMEBUTT.Click
        homepage.Show()
        Me.Hide()

    End Sub
    Private Sub STAFFBUTTHOMEf_Click(sender As Object, e As EventArgs) Handles STAFFBUTTHOME.Click

        StaffForm.Show()
        Me.Hide()
    End Sub
    Private Sub PatientHOMEBUTT_Click(sender As Object, e As EventArgs) Handles PatientHOMEBUTT.Click
        PatientForm.Show()
        Me.Hide()
    End Sub

    Private Sub SuppliesBUTTHOME_Click(sender As Object, e As EventArgs) Handles SuppliesBUTTHOME.Click
        SupFrom.Show()
        Me.Hide()

    End Sub

    Private Sub SuppliersHOMEBUTT_Click(sender As Object, e As EventArgs) Handles SuppliersHOMEBUTT.Click
        supLIERfrom.Show()
        Me.Hide()
    End Sub

    Private Sub RequisitionHOMEBUTT_Click(sender As Object, e As EventArgs) Handles RequisitionHOMEBUTT.Click
        reqFrom.Show()
        Me.Hide()
    End Sub

    Private Sub DashboardHOMEBUTT_Click(sender As Object, e As EventArgs) Handles DashboardHOMEBUTT.Click
        Dashboard.Show()
        Me.Hide()
    End Sub

    Private Sub savebtn_Click(sender As Object, e As EventArgs) Handles savebtn.Click

        ' สายการเชื่อมต่อไปยัง SQL Server
        Dim connectionString As String = "Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True"

        Using connection As New SqlConnection(connectionString)
            Try
                ' เปิดการเชื่อมต่อ
                connection.Open()

                ' เริ่มการ Transaction เพื่อให้การบันทึกในตารางทั้งหมดเกิดขึ้นพร้อมกัน
                Dim transaction As SqlTransaction = connection.BeginTransaction()

                ' บันทึกข้อมูลในตาราง Patient
                Dim queryPatient As String = "INSERT INTO Patient (Pt_ID, Pt_firstname, Pt_lastname, Pt_tel, Pt_birth, Pt_marital, Pt_reg_date, Pt_sex, Pt_address, Pt_type, Pt_status, Local_doc_name, Local_doc_lastname, Local_doc_address, Local_doc_tel, Local_clinic_id) " &
                                         "VALUES (@newPtID, @FirstName, @LastName, @Tel, @BirthDate, @MaritalStatus, @RegisterDate, @Sex, @Address, @Type, @Status, @DocName, @DocLastName, @DocAddress, @DocTel, @ClinicID)"

                Dim commandPatient As New SqlCommand(queryPatient, connection, transaction)

                ' ดึงค่า Pt_ID ล่าสุดจากฐานข้อมูล
                Dim queryMaxPtID As String = "SELECT ISNULL(MAX(Pt_ID), 0) + 1 AS NewPtID FROM Patient"
                Dim commandMaxPtID As New SqlCommand(queryMaxPtID, connection, transaction)
                Dim newPtID As Integer = Convert.ToInt32(commandMaxPtID.ExecuteScalar())

                ' จัดรูปแบบให้ Pt_ID เป็นเลข 5 หลัก มี 0 นำหน้า
                Dim formattedPtID As String = newPtID.ToString("D5")
                commandPatient.Parameters.AddWithValue("@newPtID", newPtID)
                commandPatient.Parameters.AddWithValue("@FirstName", TextBoxPatientName.Text)
                commandPatient.Parameters.AddWithValue("@LastName", TextBoxPatientLastname.Text)
                commandPatient.Parameters.AddWithValue("@Tel", TextBoxPatientTel.Text)
                commandPatient.Parameters.AddWithValue("@BirthDate", DateTimePickerBirth.Value)
                commandPatient.Parameters.AddWithValue("@MaritalStatus", ComboBoxMaritalStatus.Text)
                commandPatient.Parameters.AddWithValue("@Sex", ComboBoxSex.Text) ' เพิ่มเพศ
                commandPatient.Parameters.AddWithValue("@Address", TextBoxPatientAddress.Text) ' เพิ่มที่อยู่
                commandPatient.Parameters.AddWithValue("@RegisterDate", DateTimePickerRegisterDate.Value)
                commandPatient.Parameters.AddWithValue("@Type", "Inpatient") ' ตัวอย่างค่า Pt_type
                commandPatient.Parameters.AddWithValue("@Status", "Stable") ' ตัวอย่างค่า Pt_status
                commandPatient.Parameters.AddWithValue("@DocName", TextBoxDoctorName.Text)
                commandPatient.Parameters.AddWithValue("@DocLastName", TextBoxDoctorLastname.Text)
                commandPatient.Parameters.AddWithValue("@DocAddress", TextBoxDoctorAddress.Text)
                commandPatient.Parameters.AddWithValue("@DocTel", TextBoxDoctorTel.Text)
                commandPatient.Parameters.AddWithValue("@ClinicID", TextBoxClinicNo.Text) ' เพิ่ม Clinic No.


                ' รันคำสั่ง SQL
                commandPatient.ExecuteNonQuery()

                ' บันทึกข้อมูลในตาราง Next_of_kin
                Dim queryNextOfKin As String = "INSERT INTO Next_of_kin (Nextofkin_ID,Nextofki_name, Nextofkin_lastname, Nextofki_address, Nextofki_tel, Nextofki_relationship, Pt_ID) " &
                               "VALUES (@Nextofkin_ID, @KinFirstName, @KinLastName, @KinAddress, @KinTel, @KinRelationship, @newPtID)"

                Dim queryMaxNKID As String = "SELECT ISNULL(MAX(Pt_ID), 0) + 1 AS NewPtID FROM Patient"
                Dim commandNKID As New SqlCommand(queryMaxPtID, connection, transaction)
                Dim newNKID As Integer = Convert.ToInt32(commandMaxPtID.ExecuteScalar())

                Dim commandNextOfKin As New SqlCommand(queryNextOfKin, connection, transaction)
                Dim formattednewNKID As String = newNKID.ToString("D5")
                commandNextOfKin.Parameters.AddWithValue("@Nextofkin_ID", newNKID)
                commandNextOfKin.Parameters.AddWithValue("@KinFirstName", TextBoxContactName.Text)
                commandNextOfKin.Parameters.AddWithValue("@KinLastName", TextBoxContactLastname.Text)
                commandNextOfKin.Parameters.AddWithValue("@KinAddress", TextBoxContactAddress.Text)
                commandNextOfKin.Parameters.AddWithValue("@KinTel", TextBoxContactTel.Text)
                commandNextOfKin.Parameters.AddWithValue("@KinRelationship", ComboBoxRelationship.Text)
                commandNextOfKin.Parameters.AddWithValue("@newPtID", newPtID)


                ' รันคำสั่ง SQL
                commandNextOfKin.ExecuteNonQuery()

                ' Commit การบันทึกข้อมูล
                transaction.Commit()

                ' แสดงข้อความว่าบันทึกข้อมูลสำเร็จ
                MessageBox.Show("Data saved successfully!")


            Finally
                ' ปิดการเชื่อมต่อ
                connection.Close()
            End Try
        End Using
    End Sub


End Class