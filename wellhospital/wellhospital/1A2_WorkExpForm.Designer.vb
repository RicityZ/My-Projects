<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class WorkExpForm
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()>
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.DashboardHOMEBUTT = New System.Windows.Forms.Button()
        Me.RequisitionHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliersHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliesBUTTHOME = New System.Windows.Forms.Button()
        Me.STAFFBUTTHOME = New System.Windows.Forms.Button()
        Me.PatientHOMEBUTT = New System.Windows.Forms.Button()
        Me.HOMEBUTT = New System.Windows.Forms.Button()
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.DataGridViewWorkExp = New System.Windows.Forms.DataGridView()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.TextBoxWorkExpStaffID = New System.Windows.Forms.TextBox()
        Me.TextBoxWorkExpOrganization = New System.Windows.Forms.TextBox()
        Me.DateWorkExpStartDate = New System.Windows.Forms.DateTimePicker()
        Me.TextBoxWorkExpPosition = New System.Windows.Forms.TextBox()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.DateWorkExpEndDate = New System.Windows.Forms.DateTimePicker()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.Searchworkexpbutt = New System.Windows.Forms.Button()
        Me.StaffWorkExpBindingSource = New System.Windows.Forms.BindingSource(Me.components)
        Me.StaffWorkExpBindingSource1 = New System.Windows.Forms.BindingSource(Me.components)
        Me.Button3 = New System.Windows.Forms.Button()
        Me.Button1 = New System.Windows.Forms.Button()
        Me.AddqualiButt = New System.Windows.Forms.Button()
        Me.Button9 = New System.Windows.Forms.Button()
        Me.Panel1.SuspendLayout()
        Me.Panel2.SuspendLayout()
        CType(Me.DataGridViewWorkExp, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.StaffWorkExpBindingSource, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.StaffWorkExpBindingSource1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel1.Controls.Add(Me.DashboardHOMEBUTT)
        Me.Panel1.Controls.Add(Me.RequisitionHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliersHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliesBUTTHOME)
        Me.Panel1.Controls.Add(Me.STAFFBUTTHOME)
        Me.Panel1.Controls.Add(Me.PatientHOMEBUTT)
        Me.Panel1.Controls.Add(Me.HOMEBUTT)
        Me.Panel1.Location = New System.Drawing.Point(2, 0)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(125, 659)
        Me.Panel1.TabIndex = 4
        '
        'DashboardHOMEBUTT
        '
        Me.DashboardHOMEBUTT.Location = New System.Drawing.Point(13, 450)
        Me.DashboardHOMEBUTT.Name = "DashboardHOMEBUTT"
        Me.DashboardHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.DashboardHOMEBUTT.TabIndex = 27
        Me.DashboardHOMEBUTT.Text = "Dashboard"
        Me.DashboardHOMEBUTT.UseVisualStyleBackColor = True
        '
        'RequisitionHOMEBUTT
        '
        Me.RequisitionHOMEBUTT.Location = New System.Drawing.Point(13, 382)
        Me.RequisitionHOMEBUTT.Name = "RequisitionHOMEBUTT"
        Me.RequisitionHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.RequisitionHOMEBUTT.TabIndex = 26
        Me.RequisitionHOMEBUTT.Text = "Requisition"
        Me.RequisitionHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliersHOMEBUTT
        '
        Me.SuppliersHOMEBUTT.Location = New System.Drawing.Point(13, 308)
        Me.SuppliersHOMEBUTT.Name = "SuppliersHOMEBUTT"
        Me.SuppliersHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.SuppliersHOMEBUTT.TabIndex = 25
        Me.SuppliersHOMEBUTT.Text = "Suppliers"
        Me.SuppliersHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliesBUTTHOME
        '
        Me.SuppliesBUTTHOME.Location = New System.Drawing.Point(13, 236)
        Me.SuppliesBUTTHOME.Name = "SuppliesBUTTHOME"
        Me.SuppliesBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.SuppliesBUTTHOME.TabIndex = 24
        Me.SuppliesBUTTHOME.Text = "Supplies"
        Me.SuppliesBUTTHOME.UseVisualStyleBackColor = True
        '
        'STAFFBUTTHOME
        '
        Me.STAFFBUTTHOME.Location = New System.Drawing.Point(13, 95)
        Me.STAFFBUTTHOME.Name = "STAFFBUTTHOME"
        Me.STAFFBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.STAFFBUTTHOME.TabIndex = 23
        Me.STAFFBUTTHOME.Text = "STAFF"
        Me.STAFFBUTTHOME.UseVisualStyleBackColor = True
        '
        'PatientHOMEBUTT
        '
        Me.PatientHOMEBUTT.Location = New System.Drawing.Point(13, 165)
        Me.PatientHOMEBUTT.Name = "PatientHOMEBUTT"
        Me.PatientHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.PatientHOMEBUTT.TabIndex = 22
        Me.PatientHOMEBUTT.Text = "Patient"
        Me.PatientHOMEBUTT.UseVisualStyleBackColor = True
        '
        'HOMEBUTT
        '
        Me.HOMEBUTT.Location = New System.Drawing.Point(13, 22)
        Me.HOMEBUTT.Name = "HOMEBUTT"
        Me.HOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.HOMEBUTT.TabIndex = 21
        Me.HOMEBUTT.Text = "HOME"
        Me.HOMEBUTT.UseVisualStyleBackColor = True
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel2.Controls.Add(Me.Label1)
        Me.Panel2.Location = New System.Drawing.Point(122, 0)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(890, 76)
        Me.Panel2.TabIndex = 10
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 21.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(329, 22)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(156, 33)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Work EXP"
        '
        'DataGridViewWorkExp
        '
        Me.DataGridViewWorkExp.AllowUserToOrderColumns = True
        Me.DataGridViewWorkExp.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridViewWorkExp.Location = New System.Drawing.Point(257, 400)
        Me.DataGridViewWorkExp.Name = "DataGridViewWorkExp"
        Me.DataGridViewWorkExp.RowHeadersWidth = 62
        Me.DataGridViewWorkExp.Size = New System.Drawing.Size(540, 177)
        Me.DataGridViewWorkExp.TabIndex = 31
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label5.Location = New System.Drawing.Point(325, 313)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(99, 20)
        Me.Label5.TabIndex = 29
        Me.Label5.Text = "Organization"
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.Location = New System.Drawing.Point(341, 226)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(83, 20)
        Me.Label4.TabIndex = 28
        Me.Label4.Text = "Start Date"
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label3.Location = New System.Drawing.Point(353, 177)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(65, 20)
        Me.Label3.TabIndex = 27
        Me.Label3.Text = "Position"
        '
        'TextBoxWorkExpStaffID
        '
        Me.TextBoxWorkExpStaffID.Location = New System.Drawing.Point(439, 124)
        Me.TextBoxWorkExpStaffID.Multiline = True
        Me.TextBoxWorkExpStaffID.Name = "TextBoxWorkExpStaffID"
        Me.TextBoxWorkExpStaffID.Size = New System.Drawing.Size(200, 25)
        Me.TextBoxWorkExpStaffID.TabIndex = 26
        '
        'TextBoxWorkExpOrganization
        '
        Me.TextBoxWorkExpOrganization.Location = New System.Drawing.Point(439, 308)
        Me.TextBoxWorkExpOrganization.Multiline = True
        Me.TextBoxWorkExpOrganization.Name = "TextBoxWorkExpOrganization"
        Me.TextBoxWorkExpOrganization.Size = New System.Drawing.Size(200, 25)
        Me.TextBoxWorkExpOrganization.TabIndex = 25
        '
        'DateWorkExpStartDate
        '
        Me.DateWorkExpStartDate.Location = New System.Drawing.Point(439, 226)
        Me.DateWorkExpStartDate.Name = "DateWorkExpStartDate"
        Me.DateWorkExpStartDate.Size = New System.Drawing.Size(200, 20)
        Me.DateWorkExpStartDate.TabIndex = 24
        '
        'TextBoxWorkExpPosition
        '
        Me.TextBoxWorkExpPosition.Location = New System.Drawing.Point(439, 172)
        Me.TextBoxWorkExpPosition.Multiline = True
        Me.TextBoxWorkExpPosition.Name = "TextBoxWorkExpPosition"
        Me.TextBoxWorkExpPosition.Size = New System.Drawing.Size(200, 25)
        Me.TextBoxWorkExpPosition.TabIndex = 23
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label2.Location = New System.Drawing.Point(364, 122)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(44, 20)
        Me.Label2.TabIndex = 22
        Me.Label2.Text = "Staff"
        '
        'DateWorkExpEndDate
        '
        Me.DateWorkExpEndDate.Location = New System.Drawing.Point(439, 270)
        Me.DateWorkExpEndDate.Name = "DateWorkExpEndDate"
        Me.DateWorkExpEndDate.Size = New System.Drawing.Size(200, 20)
        Me.DateWorkExpEndDate.TabIndex = 32
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label6.Location = New System.Drawing.Point(341, 270)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(77, 20)
        Me.Label6.TabIndex = 33
        Me.Label6.Text = "End Date"
        '
        'Searchworkexpbutt
        '
        Me.Searchworkexpbutt.BackColor = System.Drawing.SystemColors.Control
        Me.Searchworkexpbutt.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Searchworkexpbutt.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.Searchworkexpbutt.Location = New System.Drawing.Point(686, 104)
        Me.Searchworkexpbutt.Name = "Searchworkexpbutt"
        Me.Searchworkexpbutt.Size = New System.Drawing.Size(94, 54)
        Me.Searchworkexpbutt.TabIndex = 34
        Me.Searchworkexpbutt.Text = "Search"
        Me.Searchworkexpbutt.UseVisualStyleBackColor = False
        '
        'StaffWorkExpBindingSource
        '
        Me.StaffWorkExpBindingSource.DataMember = "Staff_WorkExp"
        '
        'StaffWorkExpBindingSource1
        '
        Me.StaffWorkExpBindingSource1.DataMember = "Staff_WorkExp"
        '
        'Button3
        '
        Me.Button3.BackColor = System.Drawing.Color.FromArgb(CType(CType(192, Byte), Integer), CType(CType(0, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Button3.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button3.ForeColor = System.Drawing.SystemColors.Control
        Me.Button3.Location = New System.Drawing.Point(537, 349)
        Me.Button3.Name = "Button3"
        Me.Button3.Size = New System.Drawing.Size(79, 31)
        Me.Button3.TabIndex = 51
        Me.Button3.Text = "Delete"
        Me.Button3.UseVisualStyleBackColor = False
        '
        'Button1
        '
        Me.Button1.BackColor = System.Drawing.Color.SeaGreen
        Me.Button1.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button1.ForeColor = System.Drawing.SystemColors.ButtonFace
        Me.Button1.Location = New System.Drawing.Point(705, 337)
        Me.Button1.Name = "Button1"
        Me.Button1.Size = New System.Drawing.Size(75, 44)
        Me.Button1.TabIndex = 50
        Me.Button1.Text = "Save"
        Me.Button1.UseVisualStyleBackColor = False
        '
        'AddqualiButt
        '
        Me.AddqualiButt.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.AddqualiButt.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.AddqualiButt.ForeColor = System.Drawing.SystemColors.Control
        Me.AddqualiButt.Location = New System.Drawing.Point(623, 349)
        Me.AddqualiButt.Name = "AddqualiButt"
        Me.AddqualiButt.Size = New System.Drawing.Size(77, 31)
        Me.AddqualiButt.TabIndex = 49
        Me.AddqualiButt.Text = "ADD"
        Me.AddqualiButt.UseVisualStyleBackColor = False
        '
        'Button9
        '
        Me.Button9.Location = New System.Drawing.Point(828, 602)
        Me.Button9.Name = "Button9"
        Me.Button9.Size = New System.Drawing.Size(127, 38)
        Me.Button9.TabIndex = 52
        Me.Button9.Text = "ADD Quali"
        Me.Button9.UseVisualStyleBackColor = True
        '
        'WorkExpForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(984, 661)
        Me.Controls.Add(Me.Button9)
        Me.Controls.Add(Me.Button3)
        Me.Controls.Add(Me.Button1)
        Me.Controls.Add(Me.AddqualiButt)
        Me.Controls.Add(Me.Searchworkexpbutt)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.DateWorkExpEndDate)
        Me.Controls.Add(Me.DataGridViewWorkExp)
        Me.Controls.Add(Me.Label5)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.TextBoxWorkExpStaffID)
        Me.Controls.Add(Me.TextBoxWorkExpOrganization)
        Me.Controls.Add(Me.DateWorkExpStartDate)
        Me.Controls.Add(Me.TextBoxWorkExpPosition)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Name = "WorkExpForm"
        Me.Text = "WorkExpForm"
        Me.Panel1.ResumeLayout(False)
        Me.Panel2.ResumeLayout(False)
        Me.Panel2.PerformLayout()
        CType(Me.DataGridViewWorkExp, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.StaffWorkExpBindingSource, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.StaffWorkExpBindingSource1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents Panel1 As Panel
    Friend WithEvents Panel2 As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents DataGridViewWorkExp As DataGridView
    Friend WithEvents Label5 As Label
    Friend WithEvents Label4 As Label
    Friend WithEvents Label3 As Label
    Friend WithEvents TextBoxWorkExpStaffID As TextBox
    Friend WithEvents TextBoxWorkExpOrganization As TextBox
    Friend WithEvents DateWorkExpStartDate As DateTimePicker
    Friend WithEvents TextBoxWorkExpPosition As TextBox
    Friend WithEvents Label2 As Label
    Friend WithEvents DateWorkExpEndDate As DateTimePicker
    Friend WithEvents Label6 As Label
    Friend WithEvents Searchworkexpbutt As Button
    Friend WithEvents HOSPITALDataSet As HOSPITALDataSet
    Friend WithEvents StaffWorkExpBindingSource As BindingSource
    Friend WithEvents Staff_WorkExpTableAdapter As HOSPITALDataSetTableAdapters.Staff_WorkExpTableAdapter
    Friend WithEvents HOSPITALDataSet1 As HOSPITALDataSet
    Friend WithEvents StaffWorkExpBindingSource1 As BindingSource
    Friend WithEvents Staff_WorkExpTableAdapter1 As HOSPITALDataSetTableAdapters.Staff_WorkExpTableAdapter
    Friend WithEvents DashboardHOMEBUTT As Button
    Friend WithEvents RequisitionHOMEBUTT As Button
    Friend WithEvents SuppliersHOMEBUTT As Button
    Friend WithEvents SuppliesBUTTHOME As Button
    Friend WithEvents STAFFBUTTHOME As Button
    Friend WithEvents PatientHOMEBUTT As Button
    Friend WithEvents HOMEBUTT As Button
    Friend WithEvents Button3 As Button
    Friend WithEvents Button1 As Button
    Friend WithEvents AddqualiButt As Button
    Friend WithEvents Button9 As Button
End Class
